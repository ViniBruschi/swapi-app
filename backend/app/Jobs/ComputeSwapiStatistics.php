<?php

namespace App\Jobs;

use App\Models\SwapiLog;
use App\Models\SwapiStatistic;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class ComputeSwapiStatistics implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $totalQueries = SwapiLog::count();
        
        if ($totalQueries === 0) {
            SwapiStatistic::updateOrCreate(
                ['id' => 1],
                [
                    'top_queries' => [],
                    'avg_response_time_ms' => 0,
                    'most_popular_hour' => null,
                    'computed_at' => now(),
                ]
            );
            return;
        }

        $topQueries = SwapiLog::select('query', DB::raw('COUNT(*) as count'))
            ->groupBy('query')
            ->orderByDesc('count')
            ->limit(5)
            ->get()
            ->map(function ($item) use ($totalQueries) {
                return [
                    'query' => $item->query,
                    'count' => $item->count,
                    'percentage' => round(($item->count / $totalQueries) * 100, 2)
                ];
            })
            ->toArray();

        $avgResponseTime = (int) SwapiLog::avg('response_time_ms') ?? 0;

        $hourCounts = SwapiLog::select('created_at')
            ->get()
            ->groupBy(function ($log) {
                return Carbon::parse($log->created_at)->format('H');
            })
            ->map(function ($logs) {
                return $logs->count();
            })
            ->sortDesc();

        $mostPopularHourValue = $hourCounts->keys()->first() ? (int) $hourCounts->keys()->first() : null;

        SwapiStatistic::updateOrCreate(
            ['id' => 1],
            [
                'top_queries' => $topQueries,
                'avg_response_time_ms' => $avgResponseTime,
                'most_popular_hour' => $mostPopularHourValue,
                'computed_at' => now(),
            ]
        );
    }
}

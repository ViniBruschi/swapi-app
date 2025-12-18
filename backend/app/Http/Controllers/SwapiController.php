<?php

namespace App\Http\Controllers;

use App\Jobs\ComputeSwapiStatistics;
use App\Models\SwapiStatistic;
use App\Services\SwapiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class SwapiController extends Controller
{
    private SwapiService $service;

    public function __construct(SwapiService $service)
    {
        $this->service = $service;
    }

    public function search(Request $request, string $type): JsonResponse
    {
        $typeValidator = Validator::make(['type' => $type], [
            'type' => ['required', 'string', 'in:people,films,starships,vehicles,species,planets']
        ]);

        if ($typeValidator->fails()) {
            return response()->json([
                'error' => 'Invalid type. Allowed types: people, films, starships, vehicles, species, planets'
            ], 400);
        }

        $validated = $request->validate([
            'q' => ['required', 'string', 'min:1', 'max:255']
        ]);

        try {
            $result = $this->service->search($type, $validated['q']);

            return response()->json($result, 200);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Internal server error'
            ], 500);
        }
    }

    public function getFilmTitle(string $id): JsonResponse
    {
        $validator = Validator::make(['id' => $id], [
            'id' => ['required', 'string', 'min:1']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Invalid film ID'
            ], 400);
        }

        try {
            $film = $this->service->getFilmById($id);
            return response()->json($film, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Film not found'
            ], 404);
        }
    }

    public function getPerson(string $id): JsonResponse
    {
        $validator = Validator::make(['id' => $id], [
            'id' => ['required', 'string', 'min:1']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Invalid person ID'
            ], 400);
        }

        try {
            $person = $this->service->getPersonById($id);
            return response()->json($person, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Person not found'
            ], 404);
        }
    }

    public function getStatistics(): JsonResponse
    {
        $statistics = SwapiStatistic::first();

        if (!$statistics) {
            (new ComputeSwapiStatistics())->handle();
            $statistics = SwapiStatistic::first();
        }

        if (!$statistics) {
            return response()->json([
                'top_queries' => [],
                'avg_response_time_ms' => 0,
                'most_popular_hour' => null,
                'computed_at' => null,
            ], 200);
        }

        return response()->json([
            'top_queries' => $statistics->top_queries,
            'avg_response_time_ms' => $statistics->avg_response_time_ms,
            'most_popular_hour' => $statistics->most_popular_hour,
            'computed_at' => $statistics->computed_at ? $statistics->computed_at->format('c') : null,
        ], 200);
    }
}

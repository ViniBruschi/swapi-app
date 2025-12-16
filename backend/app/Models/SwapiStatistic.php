<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SwapiStatistic extends Model
{
    protected $fillable = [
        'top_queries',
        'avg_response_time_ms',
        'most_popular_hour',
        'computed_at'
    ];

    protected $casts = [
        'top_queries' => 'array',
        'computed_at' => 'datetime'
    ];
}

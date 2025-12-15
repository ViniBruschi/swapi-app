<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SwapiLog extends Model
{
    protected $table = 'swapi_logs';

    public $timestamps = false;

    protected $fillable = [
        'type',
        'query',
        'endpoint',
        'response_time_ms',
        'status',
        'error_message',
        'created_at',
    ];
}

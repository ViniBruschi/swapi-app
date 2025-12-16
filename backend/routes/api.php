<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SwapiController;

Route::prefix('api')->group(function () {
    Route::get('swapi/statistics', [SwapiController::class, 'getStatistics']);
    Route::get('swapi/films/{id}', [SwapiController::class, 'getFilmTitle']);
    Route::get('swapi/people/{id}', [SwapiController::class, 'getPerson']);
    Route::get('swapi/{type}', [SwapiController::class, 'search']);
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SwapiController;

Route::prefix('api')->group(function () {
    Route::get('swapi/{type}', [SwapiController::class, 'search']);
});

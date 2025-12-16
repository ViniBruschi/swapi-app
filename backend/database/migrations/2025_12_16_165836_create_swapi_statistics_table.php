<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('swapi_statistics', function (Blueprint $table) {
            $table->id();
            $table->json('top_queries');
            $table->integer('avg_response_time_ms');
            $table->integer('most_popular_hour')->nullable();
            $table->timestamp('computed_at');
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('swapi_statistics');
    }
};

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
        Schema::create('swapi_logs', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('query');
            $table->string('endpoint');
            $table->integer('response_time_ms');
            $table->string('status');
            $table->text('error_message')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('swapi_logs');
    }
};

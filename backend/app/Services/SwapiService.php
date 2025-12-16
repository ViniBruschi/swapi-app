<?php

namespace App\Services;

use App\Services\Swapi;
use App\Models\SwapiLog;

class SwapiService{
    private Swapi $api;
    private const TYPES = ['people', 'films', 'starships', 'vehicles', 'species', 'planets'];

    public function __construct(Swapi $api)
    {
        $this->api = $api;
    }

    public function search(string $type, string $query)
    {
        $params = ['name' => $query];
        $endpoint = 'https://www.swapi.tech/api/' . $type;
        $start = microtime(true);

        try {

            if (!in_array($type, self::TYPES, true)) {
                throw new \Exception('Error: invalid type');
            }

            $result = $this->api->search($type, $params);
            $time = (int) ((microtime(true) - $start) * 1000);
            SwapiLog::create([
                'type' => $type,
                'query' => $query,
                'endpoint' => $endpoint,
                'response_time_ms' => $time,
                'status' => 'success',
                'created_at' => now(),
                ]);

            return $result;

        } catch (\Throwable $th) {
            $time = (int) ((microtime(true) - $start) * 1000);

            SwapiLog::create([
                'type' => $type,
                'query' => $query,
                'endpoint' => $endpoint,
                'response_time_ms' => $time,
                'status' => 'error',
                'error_message' => $th->getMessage(),
                'created_at' => now(),
            ]);

            throw $th;
        }
    }

    public function getFilmById(string $id)
    {
        $endpoint = "https://www.swapi.tech/api/films/{$id}";
        $start = microtime(true);
    
        try {
            $result = $this->api->search("films/{$id}", []);
            $time = (int) ((microtime(true) - $start) * 1000);

            SwapiLog::create([
                'type' => 'films',
                'query' => $id,
                'endpoint' => $endpoint,
                'response_time_ms' => $time,
                'status' => 'success',
                'created_at' => now(),
            ]);
    
            return $result['result']['properties'];

        } catch (\Throwable $th) {
            $time = (int) ((microtime(true) - $start) * 1000);

            SwapiLog::create([
                'type' => 'films',
                'query' => $id,
                'endpoint' => $endpoint,
                'response_time_ms' => $time,
                'status' => 'error',
                'error_message' => $th->getMessage(),
                'created_at' => now(),
            ]);

            throw $th;
        }
    }

    public function getPersonById(string $id)
    {
        $endpoint = "https://www.swapi.tech/api/people/{$id}";
        $start = microtime(true);
    
        try {
            $result = $this->api->search("people/{$id}", []);
            $time = (int) ((microtime(true) - $start) * 1000);

            SwapiLog::create([
                'type' => 'people',
                'query' => $id,
                'endpoint' => $endpoint,
                'response_time_ms' => $time,
                'status' => 'success',
                'created_at' => now(),
            ]);
    
            return $result['result'];

        } catch (\Throwable $th) {
            $time = (int) ((microtime(true) - $start) * 1000);

            SwapiLog::create([
                'type' => 'people',
                'query' => $id,
                'endpoint' => $endpoint,
                'response_time_ms' => $time,
                'status' => 'error',
                'error_message' => $th->getMessage(),
                'created_at' => now(),
            ]);

            throw $th;
        }
    }    
}
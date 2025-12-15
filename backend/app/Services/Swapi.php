<?php

namespace App\Services;
use Illuminate\Support\Facades\Http;

class Swapi
{
    private $baseURL = 'https://www.swapi.tech/api/';

    public function search(string $type, array $params)
    {
        $url = $this->baseURL . $type;
        $response = Http::timeout(5)->get($url, $params);

        if (!$response->ok()) {
            throw new \Exception('Error consulting SWAPI');
        }
        return $response->json();
    }
}

<?php

namespace App\Services\Api;
use Illuminate\Support\Facades\Http;

class SwapiApi
{
    private $baseURL = 'https://www.swapi.tech/api/';

    public function search(string $type, array $params)
    {
        $url = $this->baseURL . $type;
        $response = Http::timeout(5)->get($url, $params);

        if (!$response->ok()) {
            throw new \Exception('Erro ao consultar SWAPI');
        }
        return $response->json();
    }
}

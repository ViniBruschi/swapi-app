<?php

namespace App\Services;

use App\Services\Api\Swapi;

class SwapiService{
    private Swapi $api;
    private const TYPES = ['people', 'films', 'starships', 'vehicles', 'species', 'planets'];

    public function __construct(Swapi $api){
        $this->api = $api;
    }

    public function search(string $type, string $query)
    {
        $params = ['name' => $query];
        if(in_array($type, self::TYPES, true)) {
            $result = $this->api->search($type, $params);
        } else {
            throw new \Exception('Error: invalid type');
        }
        return $result;
    }
}
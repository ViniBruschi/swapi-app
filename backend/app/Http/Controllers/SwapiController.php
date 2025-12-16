<?php

namespace App\Http\Controllers;

use App\Services\SwapiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SwapiController extends Controller
{
    private SwapiService $service;

    public function __construct(SwapiService $service)
    {
        $this->service = $service;
    }

    public function search(Request $request, string $type): JsonResponse
    {
        $query = $request->query('q');

    if (!$query) {
            return response()->json([
                'error' => 'Query parameter "q" is required'
            ], 400);
        }

        try {
            $result = $this->service->search($type, $query);

            return response()->json($result, 200);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Internal server error'
            ], 500);
        }
    }

    public function getFilmTitle(string $id): JsonResponse
    {
        try {
            $film = $this->service->getFilmById($id);
            return response()->json($film, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Film not found'
            ], 404);
        }
    }

    public function getPerson(string $id): JsonResponse
    {
        try {
            $person = $this->service->getPersonById($id);
            return response()->json($person, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Person not found'
            ], 404);
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Politic;
use Illuminate\Http\Request;

class PoliticContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $newPolitic = Politic::create([
            'name' => 'Nicólas Maduro',
            'office' => 'Presidente',
            'age' => '61',
            'since' => 2013,
            'status' => 1,
            'normal_photo' => 'https://www.lapatilla.com/wp-content/uploads/2013/04/000_Was7438662.jpg',
            'jail_photo' => 'https://elsolweb.tv/wp-content/uploads/2018/04/maduro-preso.jpg',

        ]);
        return $this->returnSuccess(200,$newPolitic);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Models\Crime;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CrimeController extends Controller
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
        $newCrime = Crime::create([
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'refrences' => $request->refrences,
            'user_id' => $request->user_id,

        ]);
        return $this->returnSuccess(200,[$newCrime]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->returnSuccess(200, Crime::with(['politic'])->find($id) );
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
        $crime = Crime::find($id);
        $crime->title = $request->title;
        $crime->description = $request->description;
        $crime->date = $request->date;
        $crime->refrences = $request->refrences;
        $crime->user_id = $request->user_id;
        
        $crime->save();
        return $this->returnSuccess(200, $crime);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $crime = Crime::find($id);
        $crime->delete();

        return $this->returnSuccess(200, $crime);
    }
}

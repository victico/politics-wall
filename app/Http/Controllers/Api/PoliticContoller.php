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
    public function index(Request $request)
    {
        //
        $allPolitics = Politic::query();
        if(isset($request->status)){
            $allPolitics->where('status', $request->status);
        }
        return $this->returnSuccess(200, $allPolitics->get() );
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
        //.
        $imgPath = '';
        $jailImgPath = '';

        if ($request->photo) {
            $imgPath = 'images/politics/' . trim(str_replace(' ', '_', $request->name ));
            $request->file('photo')->move('images/politics/', $imgPath);
        }
        if ($request->jail_photo) {
            $jailImgPath = 'images/politics/' . trim(str_replace(' ', '_', $request->name )) .'_jail';
            $request->file('jail_photo')->move('images/politics/', $jailImgPath);
        }

        $newPolitic = Politic::create([
            'name' => $request->name,
            'office' => $request->office,
            'age' => $request->age,
            'since' => $request->since,
            'vite_jail' => 0,
            'vote_no_jail' => 0,
            'normal_photo' => $imgPath,
            'jail_photo' => $jailImgPath,

        ]);
        return $this->returnSuccess(200,[$newPolitic, $file = $request->photo, $request->jail_photo]);
    }

    /**
     * Display the specified resource.
     */
    public function getById(string $id)
    {
        return $this->returnSuccess(200, Politic::find($id) );
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

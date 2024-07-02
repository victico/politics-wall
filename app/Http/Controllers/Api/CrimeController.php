<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Crime;
use App\Models\Politic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Date;

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
        try {
            $newCrime = Crime::create([
                'title'         => $request->title,
                'description'   => $request->description,
                'date'          => $request->date,
                'references'    => $request->references,
                'user_id'       => $request->user_id,

            ]);
        } catch (Exception $th) {
            return $this->returnSuccess(400, $th->getMessage() );
        }

        return $this->returnSuccess(200, Politic::with(['crimes'])->find($newCrime->user_id));
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
        $crime = Crime::find($id);
        $crime->title = $request->title;
        $crime->description = $request->description;
        $crime->date = empty($request->date) ? $crime->date : $request->date;
        $crime->references = empty($request->references) ? $crime->references : $request->references;
        
        $crime->save();
        return $this->returnSuccess(200, Politic::with(['crimes'])->find($crime->user_id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $crime = Crime::find($id);
        $crime->delete();
        return $this->returnSuccess(200, Politic::with(['crimes'])->find($crime->user_id));
    }
}

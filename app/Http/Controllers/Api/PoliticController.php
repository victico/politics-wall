<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Politic;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PoliticController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $allPolitics = Politic::query()->with(['crimes'])->where('name', 'like', '%'.$request->name.'%');
        if(isset($request->status)){
            $allPolitics->where('status', $request->status);
        }
        return $this->returnSuccess(200, $allPolitics->paginate(25));
    }
    public function indexPublic(Request $request)
    {
        //
        $allPolitics = Politic::query()->with(['crimes'])->where('name', 'like', '%'.$request->name.'%');
        return $this->returnSuccess(200, $allPolitics->paginate(25));
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
        $validated = $this->validateFieldsFromInput($request->all()) ;
        if (count($validated) > 0) return $this->returnFail(400, $validated[0]);

        $imgPath = '';
        if ($request->photo) {
            $imgPath = 'public/images/politics/' . trim(str_replace(' ', '_', $request->name )).'_'.rand().'.'. $request->File('photo')->extension();
            $request->file('photo')->move('public/images/politics/', $imgPath);
        }
        try {
            //code...
            $newPolitic = Politic::create([
                'name'              => $request->name,
                'office'            => $request->office,
                'political_party'   => $request->political_party,
                'since'             => $request->since ?? '---',
                'vote_jail'         => 0,
                'vote_no_jail'      => 0,
                'normal_photo'      => $imgPath,
            ]);
        } catch (Exception $th) {
            return $this->returnFail(404, $th->getMessage());
        }
        return $this->returnSuccess(200, $newPolitic);
    }

    /**
     * Display the specified resource.
     */
    public function get(string $id)
    {
        return $this->returnSuccess(200, Politic::with(['crimes'])->find($id) );
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
        $politic = Politic::find($id);
        $imgPath = $politic->normal_photo;

        if ($request->hasFile('photo_update')) {
            $imgPath = 'images/politics/' . trim(str_replace(' ', '_', $request->name )).'_'.rand().'.'. $request->File('photo_update')->extension();
            $request->file('photo_update')->move('images/politics/', $imgPath);
        }

        $politic->name = $request->name;
        $politic->office = $request->office;
        $politic->political_party = $request->political_party;
        $politic->since = $request->since;
        $politic->normal_photo = $imgPath;
        
        $politic->save();
        return $this->returnSuccess(200, $politic);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $politic = Politic::find($id);
        $politic->delete();

        return $this->returnSuccess(200, $politic);
    }
    private function validateFieldsFromInput($inputs){


        $rules=[
            'name'              => ['required', 'regex:/^[a-zA-Z-À-ÿ .]+$/i'],
            'office'            => ['required', 'regex:/^[0-9-a-zA-Z-À-ÿ&$ .]+$/i'],
            'political_party'   => ['required', 'regex:/^[0-9-a-zA-Z-À-ÿ&$ .]+$/i'],
            'since'             => ['required', 'regex:/^[0-9\- ]+$/i'],
            'photo'             => ['required', 'file'],
            // 'age'           => ['required', 'integer', 'regex:/^[0-9]+$/i'],
            // 'nationality'   => ['required', 'regex:/^[a-zA-Z-À-ÿ&$ .]+$/i'],

        ];
        $messages = [
            'name.required'             => 'El nombre es requerido.',
            'name.regex'                => 'Nombre no valido.',
            'office.required'           => 'El cargo es requerido.',
            'office.regex'              => 'Cargo no valido.',
            'political_party.required'  => 'El partido político es requerida.',
            'political_party.regex'     => 'Partido político no valido.',
            'since.regex'               => 'Ingresar un año valido.',
            'since.required'            => 'El año es requerido.',
            'photo.required'            => 'La foto es requerida.',
            'photo.file'                => 'La foto es requerida.'
            // 'age.required'          => 'La edad es requerida.',
            // 'age.integer'           => 'Edad no valida.',
            // 'age.regex'             => 'Edad no valida.',
            // 'nationality.required'  => 'El nacionalidad es requerida.',
            // 'nationality.regex'     => 'Nacionalidad no valido.',
        ];


         $validator = Validator::make($inputs, $rules, $messages)->errors();

        return $validator->all() ;

}
}

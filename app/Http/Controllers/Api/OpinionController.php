<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Opinion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class OpinionController extends Controller
{
    //
    public function indexPublic(Request $request)
    {
        $allPolitics = Opinion::query();
        return $this->returnSuccess(200, $allPolitics->paginate(25));
    }
    public function getOpinions(Request $request) {
        $opinions = Opinion::query();
        return $this->returnSuccess(200, $opinions->paginate(25));
    }
    public function storeOpinion(Request $request) {
        $validated = $this->validateFieldsFromInput($request->all()) ;
        if (count($validated) > 0) return $this->returnFail(400, $validated[0]);

        $imgPath = '';
        if ($request->photo) {
            $imgPath = 'public/images/opinion_author/' . trim(str_replace(' ', '_', $request->name )).'_'.rand().'.'. $request->File('photo')->extension();
            $request->file('photo')->move('public/images/opinion_author/', $imgPath);
        }

        try {
            $opinion = Opinion::create([
                'institution'   => $request->institution,
                'title'         => $request->title, 
                'author'        => $request->author, 
                'opinion'       => $request->opinion, 
                'photo'         => $imgPath, 
            ]);
            
        } catch (Exception $th) {
            return $this->returnFail(400, $th);
        }
        return $this->returnSuccess(200, $opinion);
    }
    public function getOpinionById($id) {
        $opinion = Opinion::find($id);
        return $this->returnSuccess(200, $opinion);
    }
    public function updateOpinion(Request $request, $id){

        $opinion = Opinion::find($id);
        $imgPath = $opinion->photo;

        if ($request->hasFile('photo')) {
            $imgPath = 'public/images/opinion_author/' . trim(str_replace(' ', '_', $request->name )).'_'.rand().'.'. $request->File('photo')->extension();
            $request->file('photo')->move('public/images/opinion_author/', $imgPath);
        }

        $opinion->title = $request->title ?? $opinion->title ;
        $opinion->institution = $request->institution ?? $opinion->institution;
        $opinion->author = $request->author ?? $opinion->author;
        $opinion->opinion = $request->opinion ?? $opinion->opinion;
        $opinion->photo = $imgPath ?? $opinion->photo;
        
        $opinion->save();
        return $this->returnSuccess(200, $opinion);

    }
    public function destroy(string $id)
    {
        //
        $opinion = Opinion::find($id);
        $opinion->delete();

        return $this->returnSuccess(200, $opinion);
    }
    private function validateFieldsFromInput($inputs){


        $rules=[
            'title'             => ['required', 'regex:/^[0-9-a-zA-Z-À-ÿ&,$ .]+$/i'],
            'institution'       => ['required', 'regex:/^[0-9-a-zA-Z-À-ÿ&$ .,]+$/i'],
            'author'            => ['required', 'regex:/^[a-zA-Z-À-ÿ .]+$/i'],
            'opinion'           => ['required'],
            'photo'             => ['required', 'file'],

        ];
        $messages = [
            'title.required'        => 'El titúlo es requerido.',
            'title.regex'           => 'Titúlo no valido.',
            'institution.required'  => 'La Institución es requerida.',
            'institution.regex'     => 'Institución no valido.',
            'author.required'       => 'El Autor es requerido.',
            'author.regex'          => 'Autor no valido.',
            'opinion.required'      => 'La opinión es requerida.',
            'photo.required'        => 'La foto es requerida.',
            'photo.file'            => 'La foto es requerida.'
        ];


         $validator = Validator::make($inputs, $rules, $messages)->errors();

        return $validator->all() ;

    }
}

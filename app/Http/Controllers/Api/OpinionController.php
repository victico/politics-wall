<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Opinion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OpinionController extends Controller
{
    //
    public function getOpinions(Request $request) {
        $opinions = Opinion::query();

        // $opinions = Opinion::query()->with(['crimes'])->where('name', 'like', '%'.$request->name.'%');
        // if(isset($request->status)){
        //     $opinions->where('status', $request->status);
        // }
        return $this->returnSuccess(200, $opinions->paginate(25));
    }
    public function storeOpinion(Request $request) {
        try {
            $opinion = Opinion::create([
                'institution'   => $request->institution,
                'title'         => $request->title, 
                'author'        => $request->author, 
                'opinion'       => $request->opinion, 
                'photo'         => $request->photo, 
            ]);
            
        } catch (Exception $th) {
            return $this->returnFail(400, $th);
        }
        return $this->returnSuccess(200, $opinion);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Administrative;
use Illuminate\Http\Request;

class AdministrativeController extends ApiController
{
    public function index()
    {
        return response()->json(Administrative::all());
    }

    public function raions(){
        return response()->json(Administrative::whereIn('type',['R','GO'])->get());
    }

    public function nps($raion_code){
        return response()->json(Administrative::where('type','NP')->where('raion_code',$raion_code)->get());
    }

    public function one($id)
    {
        return response()->json(Administrative::find($id));
    }

    public function create(Request $request)
    {
        $item = Administrative::create($request->all());

        return response()->json($item, 201);
    }

    public function update($id, Request $request)
    {
        $item = Administrative::findOrFail($id);
        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function delete($id)
    {
        Administrative::findOrFail($id)->delete();
        return response('Удалено', 200);
    }
}
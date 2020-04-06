<?php

namespace App\Http\Controllers;

use App\Models\Bort;
use Illuminate\Http\Request;

class BortController extends ApiController
{

    public function index()
    {
        return response()->json(Bort::with(['model','type','departament'])->get());
    }

    public function one($id)
    {
        return response()->json(Bort::find($id));
    }

    public function create(Request $request)
    {
        $item = Bort::create($request->all());

        return response()->json($item, 201);
    }

    public function update($id, Request $request)
    {
        $item = Bort::findOrFail($id);
        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function delete($id)
    {
        Bort::findOrFail($id)->delete();
        return response('Удалено', 200);
    }
}
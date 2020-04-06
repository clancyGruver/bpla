<?php

namespace App\Http\Controllers;

use App\Models\Bort_model;
use Illuminate\Http\Request;

class BortModelController extends ApiController
{

    public function index()
    {
        return response()->json(Bort_model::all());
    }

    public function one($id)
    {
        return response()->json(Bort_model::find($id));
    }

    public function create(Request $request)
    {
        $item = Bort_model::create($request->all());

        return response()->json($item, 201);
    }

    public function update($id, Request $request)
    {
        $item = Bort_model::findOrFail($id);
        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function delete($id)
    {
        Bort_model::findOrFail($id)->delete();
        return response('Удалено', 200);
    }
}
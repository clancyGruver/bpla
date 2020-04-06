<?php

namespace App\Http\Controllers;

use App\Models\Bort_type;
use Illuminate\Http\Request;

class BortTypeController extends ApiController
{

    public function index()
    {
        return response()->json(Bort_type::all());
    }

    public function one($id)
    {
        return response()->json(Bort_type::find($id));
    }

    public function create(Request $request)
    {
        $item = Bort_type::create($request->all());

        return response()->json($item, 201);
    }

    public function update($id, Request $request)
    {
        $item = Bort_type::findOrFail($id);
        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function delete($id)
    {
        Bort_type::findOrFail($id)->delete();
        return response('Удалено', 200);
    }
}
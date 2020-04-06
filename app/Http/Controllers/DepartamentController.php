<?php

namespace App\Http\Controllers;

use App\Models\Departament;
use Illuminate\Http\Request;

class DepartamentController extends ApiController
{

    public function index()
    {
        return response()->json(Departament::all());
    }

    public function one($id)
    {
        return response()->json(Departament::find($id));
    }

    public function create(Request $request)
    {
        $item = Departament::create($request->all());

        return response()->json($item, 201);
    }

    public function update($id, Request $request)
    {
        $item = Departament::findOrFail($id);
        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function delete($id)
    {
        Departament::findOrFail($id)->delete();
        return response('Удалено', 200);
    }
}
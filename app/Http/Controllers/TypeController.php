<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends ApiController
{

    public function index()
    {
        return response()->json(Type::all());
    }

    public function one($id)
    {
        return response()->json(Type::find($id));
    }

    public function create(Request $request)
    {
        $item = Type::create($request->all());

        return response()->json($item, 201);
    }

    public function update($id, Request $request)
    {
        $item = Type::findOrFail($id);
        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function delete($id)
    {
        Type::findOrFail($id)->delete();
        return response('Удалено', 200);
    }
}
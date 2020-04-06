<?php

namespace App\Http\Controllers;

use App\Models\Target;
use Illuminate\Http\Request;

class TargetController extends ApiController
{

    public function index()
    {
        return response()->json(Target::all());
    }

    public function one($id)
    {
        return response()->json(Target::find($id));
    }

    public function create(Request $request)
    {
        $item = Target::create($request->all());

        return response()->json($item, 201);
    }

    public function update($id, Request $request)
    {
        $item = Target::findOrFail($id);
        $item->update($request->all());

        return response()->json($item, 200);
    }

    public function delete($id)
    {
        Target::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
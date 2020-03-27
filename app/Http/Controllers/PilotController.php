<?php

namespace App\Http\Controllers;

use App\Models\Pilot;
use Illuminate\Http\Request;

class PilotController extends ApiController
{

    public function index()
    {
        return response()->json(Pilot::all());
    }

    public function one($id)
    {
        return response()->json(Pilot::find($id));
    }

    public function create(Request $request)
    {
        $author = Pilot::create($request->all());

        return response()->json($author, 201);
    }

    public function update($id, Request $request)
    {
        $author = Pilot::findOrFail($id);
        $author->update($request->all());

        return response()->json($author, 200);
    }

    public function delete($id)
    {
        Pilot::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Fly;
use Illuminate\Http\Request;

class FlyController extends ApiController
{
    private $withArray = ['departament','bort','target','pilot','raion'];

    public function index()
    {
        $objects = Fly::with($this->withArray)->get();
        foreach($objects as $object){
            if(!is_null($object->np_okato))
                $object->np;
        }
        return response()->json($objects);
    }

    public function one($id)
    {
        return response()->json(Fly::find($id));
    }

    public function create(Request $request)
    {
        $item = Fly::create($request->all());
        $item = Fly::with($this->withArray)->find($item->id);
        if($item->np_okato)
            $item->np;

        return response()->json($item, 201);
    }

    public function update($id, Request $request)
    {
        $item = Fly::findOrFail($id);
        $item->update($request->all());
        $item = Fly::with($this->withArray)->find($id);
        if($item->np_okato)
            $item->np;

        return response()->json($item, 200);
    }

    public function delete($id)
    {
        Fly::findOrFail($id)->delete();
        return response('Удалено', 200);
    }
}
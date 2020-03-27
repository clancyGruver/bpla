<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class ApiController extends BaseController
{
    /**
    * Instantiate a new UserController instance.
    *
    * @return void
    */
   public function __construct()
   {
       $this->middleware('auth');
   }

    protected function respondWithToken($token)
      {
          return response()->json([
              'token' => $token,
              'token_type' => 'bearer',
              'expires_in' => Auth::factory()->getTTL() * 60
          ], 200);
      }
}

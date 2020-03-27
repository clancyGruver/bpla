<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('login', 'AuthController@login');

    $router->group(['middleware' => 'auth:api'], function () use ($router) {
        $router->post('register', 'AuthController@register');    
        $router->get('profile', 'UserController@profile');
        $router->get('users/{id}', 'UserController@singleUser');
        $router->get('users', 'UserController@allUsers');

        $router->group(['prefix' => 'pilot'], function () use ($router) {
            $router->get('/','PilotController@index');
            $router->get('/{id}','PilotController@one');
            $router->post('/{id}','PilotController@create');
            $router->delete('/{id}','PilotController@delete');
            $router->put('/{id}','PilotController@update');
        });
    }); 
 });

 $router->get('/{route:.*}/', function () {
     return view('app');
 });
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

        $router->group(['prefix' => 'target'], function () use ($router) {
            $router->get('/','TargetController@index');
            $router->get('/{id}','TargetController@one');
            $router->post('/','TargetController@create');
            $router->delete('/{id}','TargetController@delete');
            $router->put('/{id}','TargetController@update');
        });

        $router->group(['prefix' => 'types'], function () use ($router) {
            $router->get('/','TypeController@index');
            $router->get('/{id}','TypeController@one');
            $router->post('/','TypeController@create');
            $router->delete('/{id}','TypeController@delete');
            $router->put('/{id}','TypeController@update');
        });

        $router->group(['prefix' => 'departaments'], function () use ($router) {
            $router->get('/','DepartamentController@index');
            $router->get('/{id}','DepartamentController@one');
            $router->post('/','DepartamentController@create');
            $router->delete('/{id}','DepartamentController@delete');
            $router->put('/{id}','DepartamentController@update');
        });
        
        $router->group(['prefix' => 'borts'], function () use ($router) {
            $router->get('/','BortController@index');
            $router->get('/{id}','BortController@one');
            $router->post('/','BortController@create');
            $router->delete('/{id}','BortController@delete');
            $router->put('/{id}','BortController@update');
        });

        $router->group(['prefix' => 'bort-models'], function () use ($router) {
            $router->get('/','BortModelController@index');
            $router->get('/{id}','BortModelController@one');
            $router->post('/','BortModelController@create');
            $router->delete('/{id}','BortModelController@delete');
            $router->put('/{id}','BortModelController@update');
        });

        $router->group(['prefix' => 'bort-types'], function () use ($router) {
            $router->get('/','BortTypeController@index');
            $router->get('/{id}','BortTypeController@one');
            $router->post('/','BortTypeController@create');
            $router->delete('/{id}','BortTypeController@delete');
            $router->put('/{id}','BortTypeController@update');
        });

        $router->group(['prefix' => 'pilot'], function () use ($router) {
            $router->get('/','PilotController@index');
            $router->get('/{id}','PilotController@one');
            $router->post('/','PilotController@create');
            $router->delete('/{id}','PilotController@delete');
            $router->put('/{id}','PilotController@update');
        });
    }); 
 });

 $router->get('/{route:.*}/', function () {
     return view('app');
 });
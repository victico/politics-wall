<?php

use App\Http\Controllers\Api\PoliticContoller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



// Route::middleware('jwt.verify')->post('/checkToken', [AuthController::class, 'checkToken']);
// Route::middleware('jwt.verify')->prefix('user')->name('user.')->group(function () {
//     Route::get('/', [AuthController::class, 'getUser'])->name('getUser');
//     Route::post('/',[UserController::class, 'createUser']);
//     Route::post('/{id}',[UserController::class, 'updateUser']);
//     Route::post('/chef',[UserController::class, 'createUser']);
//     Route::delete('/{id}',[UserController::class, 'deleteUser']);
//     Route::get('/all-client', [UserController::class, 'getAllclient']);
//     Route::get('/get-by-id/{id}',[UserController::class, 'getUserById']);
// });
Route::prefix('politic')->name('politic.')->group(function () {
    Route::get('/', [PoliticContoller::class, 'index']);
    Route::post('/', [PoliticContoller::class, 'store']);

});
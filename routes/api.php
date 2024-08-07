<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CrimeController;
use App\Http\Controllers\Api\PoliticController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\OpinionController;
use App\Http\Controllers\Api\UserController;

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

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('jwt.verify')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('jwt.verify')->post('/get_current_user', [AuthController::class, 'getUser']);

Route::post('/create-user', [UserController::class, 'store']);

Route::prefix('public')->name('public.')->group(function () {
    Route::get('/politic', [PoliticController::class, 'indexPublic']);
    Route::get('/opinion', [OpinionController::class, 'indexPublic']);
    Route::get('/getOpinion/{id}', [OpinionController::class, 'getOpinionById']);

});
Route::middleware('jwt.verify')->prefix('politic')->name('politic.')->group(function () {
    Route::get('/', [PoliticController::class, 'index']);
    Route::post('/', [PoliticController::class, 'store']);
    Route::get('/getPolitic/{id}', [PoliticController::class, 'gety']);
    Route::post('/{id}', [PoliticController::class, 'update']);
    Route::get('/q/', [PoliticController::class, 'getBySearch']);
    Route::post('/delete/{id}', [PoliticController::class, 'destroy']);

});
Route::middleware('jwt.verify')->prefix('user')->name('user.')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/change_password', [UserController::class, 'updatePassword']);

});
Route::middleware('jwt.verify')->prefix('crime')->name('crime.')->group(function () {
    Route::post('/', [CrimeController::class, 'store']);
    Route::get('/{id}', [CrimeController::class, 'show']);
    Route::post('/{id}', [CrimeController::class, 'update']);
    Route::post('/delete/{id}', [CrimeController::class, 'destroy']);
});
Route::middleware('jwt.verify')->prefix('opinion')->name('opinion.')->group(function () {
    Route::get('/', [OpinionController::class, 'getOpinions']);
    Route::post('/', [OpinionController::class, 'storeOpinion']);
    Route::get('/getOpinion/{id}', [OpinionController::class, 'getOpinionById']);
    Route::post('/{id}', [OpinionController::class, 'updateOpinion']);
    Route::post('/delete/{id}', [OpinionController::class, 'destroy']);
});
<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowController;
use App\Http\Controllers\BorrowingRecordController;
use App\Http\Controllers\CopyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StatisticController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// login
Route::post('register', [UserController::class, 'store']);
Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::get('getLogedInUserInfo', [UserController::class, 'getLogedInUserInfo'])->middleware('auth:sanctum');

// users
Route::group(['middleware' => ['auth:sanctum', 'can:admin']], function () {
    Route::apiResource('users', UserController::class);
    Route::get('users/findByUsername/{username:username}', [UserController::class, 'findByUsername']);
});

// profile
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile/allBorrowedBooks', 'allBorrowedBooks');
        Route::get('/profile/lateBooks', 'lateBooks');
        Route::get('/profile/borrowedBooks', 'borrowedBooks');
        Route::get('/profile/paidBooks', 'paidBooks');
        Route::get('/profile/notPaidBooks', 'notPaidBooks');
    });
});

// books
Route::apiResource('books', BookController::class)->middleware(['auth:sanctum', 'can:admin'])->except(['index', 'show']);
Route::apiResource('books', BookController::class)->only(['index', 'show']);
// copies and borrowing records
Route::group(['middleware' => ['auth:sanctum', 'can:admin']], function () {
    Route::apiResource('books.copies', CopyController::class)->shallow();

    Route::apiResource('borrowingRecords', BorrowingRecordController::class);
    Route::post('/borrowingRecords/returnBorrowedBook/{id}', [BorrowingRecordController::class, 'returnBorrowedBook']);
    Route::post('/borrowingRecords/payBorrowedBook/{id}', [BorrowingRecordController::class, 'payBorrowedBook']);
});

// statistics
Route::get('/statistics', [StatisticController::class, 'statistic']);
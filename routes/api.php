<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowController;
use App\Http\Controllers\BorrowingRecordController;
use App\Http\Controllers\CopyController;
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

Route::apiResource('users', UserController::class);

Route::apiResource('books', BookController::class);
Route::apiResource('books.copies', CopyController::class)->shallow();

Route::apiResource('borrowingRecords', BorrowingRecordController::class);
Route::post('/borrowingRecords/returnBorrowedBook', [BorrowingRecordController::class, 'returnBorrowedBook']);
Route::post('/borrowingRecords/payBorrowedBook', [BorrowingRecordController::class, 'payBorrowedBook']);
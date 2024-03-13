<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowController;
use App\Http\Controllers\CopieController;
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

// users
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// books
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::post('/books', [BookController::class, 'store']);
Route::put('/books/{id}', [BookController::class, 'update']);
Route::delete('/books/{id}', [BookController::class, 'destroy']);

// copies
Route::get('/copies/book/{book_id}',[CopieController::class, 'index']);
Route::get('/copies/copie/{copie_id}',[CopieController::class, 'show']);
Route::post('/copies/{book_id}',[CopieController::class, 'store']);
Route::delete('/copies/{copie_id}',[CopieController::class, 'destroy']);

// Borrowing
Route::get('/borrowing', [BorrowController::class, 'showBorrowedBooks']);
Route::post('/borrowing/borrow/{user_id}/{copy_id}', [BorrowController::class, 'borrowBook']);
Route::post('/borrowing/returnBook/{borrow_id}', [BorrowController::class, 'returnBook']);
Route::post('/borrowing/payBorrowedBook/{borrow_id}', [BorrowController::class, 'payBorrowedBook']);

<?php

use App\Http\Controllers\AuthController;
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


// Authentification
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('logout', 'logout');
        Route::get('getLogedInUserInfo', 'getLogedInUserInfo');
    });
});


// Manage Users
Route::group(['middleware' => ['auth:sanctum', 'can:admin']], function () {
    Route::apiResource('users', UserController::class);
    Route::get('users/findByUsername/{username:username}', [UserController::class, 'findByUsername']);
});


// User Profile
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile/allBorrowedBooks', 'allBorrowedBooks');
        Route::get('/profile/lateBooks', 'lateBooks');
        Route::get('/profile/borrowedBooks', 'borrowedBooks');
        Route::get('/profile/paidBooks', 'paidBooks');
        Route::get('/profile/notPaidBooks', 'notPaidBooks');
    });
});


// Manage Books
Route::apiResource('books', BookController::class)->middleware(['auth:sanctum', 'can:admin'])->except(['index', 'show']);
// Show Books
Route::apiResource('books', BookController::class)->only(['index', 'show']);


// Manage Copies
Route::group(['middleware' => ['auth:sanctum', 'can:admin']], function () {
    Route::apiResource('books.copies', CopyController::class)->shallow();
});


// Manage Borrowing Records
Route::group(['middleware' => ['auth:sanctum', 'can:admin']], function () {
    Route::apiResource('borrowingRecords', BorrowingRecordController::class);
    Route::post('/borrowingRecords/returnBorrowedBook/{id}', [BorrowingRecordController::class, 'returnBorrowedBook']);
    Route::post('/borrowingRecords/payBorrowedBook/{id}', [BorrowingRecordController::class, 'payBorrowedBook']);
});


// Statistics
Route::get('/statistics', [StatisticController::class, 'statistic']);
Route::get('/statistics/topUsers', [StatisticController::class, 'topUsers']);
Route::get('/statistics/topBooks', [StatisticController::class, 'topBooks']);
Route::get('/statistics/lastSevenDaysBorrows', [StatisticController::class, 'lastSevenDaysBorrows']);
Route::get('/statistics/borrowedBooksCount', [StatisticController::class, 'borrowedBooksCount']);

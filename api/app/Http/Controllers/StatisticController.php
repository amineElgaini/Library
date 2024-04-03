<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BorrowingRecord;
use App\Models\Fine;
use App\Models\User;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    public function statistic()
    {
        $usersCount = User::count();
        $BooksCount = Book::count();
        $borrowedBooksNotPaidCount = Fine::where('payment_status', 0)->count();
        $lateBooksCount = BorrowingRecord::where('due_date', '<', now())
            ->whereNull('actual_return_date')->count();

        return response()->json([
            "usersCount" => $usersCount, "booksCount" => $BooksCount,
            "borrowedBooksNotPaidCount" => $borrowedBooksNotPaidCount, "lateBooksCount" => $lateBooksCount
        ]);
    }
}

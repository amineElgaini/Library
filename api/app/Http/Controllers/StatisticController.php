<?php

namespace App\Http\Controllers;

use App\Http\Resources\lastSevenDaysBorrowsResource;
use App\Models\Book;
use App\Models\BorrowingRecord;
use App\Models\Fine;
use App\Models\User;
use App\Models\VwGetLastSevenDay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    // most borrowed
    public function topUsers()
    {
        return User::select('users.id', 'users.username', 'users.email')
            ->selectRaw('COUNT(*) as borrowedTimes')
            ->join('borrowing_records', 'users.id', '=', 'borrowing_records.user_id')
            ->groupBy('users.id', 'users.username')
            ->orderByDesc('borrowedTimes')
            ->limit(5)
            ->get();
    }

    public function topBooks()
    {
        return Book::select(
            'books.id',
            'books.isbn',
            'books.title',
            DB::raw('cast(SUM(CASE WHEN actual_return_date IS NULL THEN 1 ELSE 0 END)as int) AS borrowedNow'),
            DB::raw('COUNT(*) as borrowedTimes')
        )
            ->join('copies', 'copies.book_id', '=', 'books.id')
            ->join('borrowing_records', 'borrowing_records.copy_id', '=', 'copies.id')
            ->groupBy('books.id')
            ->orderByDesc('borrowedTimes')
            ->limit(5)
            ->get();
    }

    public function lastSevenDaysBorrows()
    {
        $records = VwGetLastSevenDay::leftJoin('vw_get_last_borrow_for_last_7_days', 'vw_get_last_seven_days.date', '=', 'vw_get_last_borrow_for_last_7_days.borrowing_date')
            ->select([
                'vw_get_last_seven_days.date',
                DB::raw('DAYNAME(vw_get_last_seven_days.date) AS day_name'),
                DB::raw('DAYOFWEEK(vw_get_last_seven_days.date) AS day_number'),
                DB::raw('CASE WHEN borrows IS NULL THEN 0 ELSE borrows END AS borrows')
            ])
            ->orderBy('vw_get_last_seven_days.date')
            ->get();
        return LastSevenDaysBorrowsResource::collection($records);
    }
}

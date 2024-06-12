<?php

namespace App\Http\Controllers;

use App\Http\Resources\lastSevenDaysBorrowsResource;
use App\Models\Book;
use App\Models\BorrowingRecord;
use App\Models\Copy;
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
            'books.ISBN',
            'books.title',
            DB::raw('CAST(SUM(CASE WHEN actual_return_date IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS borrowedNow'),
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
        $records = DB::table(DB::raw("
    (SELECT DATE_FORMAT(CURDATE() + INTERVAL 1 DAY - INTERVAL numbers.number DAY, '%Y-%m-%d') AS `date`
    FROM (
        SELECT 1 AS `number`
        UNION SELECT 2 AS `number`
        UNION SELECT 3 AS `number`
        UNION SELECT 4 AS `number`
        UNION SELECT 5 AS `number`
        UNION SELECT 6 AS `number`
        UNION SELECT 7 AS `number`
    ) numbers) as last_seven_days"))
            ->leftJoin(DB::raw("
        (SELECT
            CAST(`borrowing_records`.`borrowing_date` AS DATE) AS `borrowing_date`,
            COUNT(0) AS `borrows`
        FROM
            ((`borrowing_records`
            JOIN `copies` ON (`borrowing_records`.`copy_id` = `copies`.`id`))
            JOIN `books` ON (`books`.`id` = `copies`.`book_id`))
        WHERE
            `borrowing_records`.`borrowing_date` BETWEEN CURDATE() - INTERVAL 6 DAY AND CURDATE() + INTERVAL 1 DAY
        GROUP BY
            CAST(`borrowing_records`.`borrowing_date` AS DATE)
        ORDER BY
            `borrowing_records`.`borrowing_date`
        LIMIT 7) as last_borrow_for_last_seven_days
    "), 'last_seven_days.date', '=', 'last_borrow_for_last_seven_days.borrowing_date')
            ->select([
                'last_seven_days.date',
                DB::raw('DAYNAME(last_seven_days.date) AS day_name'),
                DB::raw('DAYOFWEEK(last_seven_days.date) AS day_number'),
                DB::raw('CASE WHEN borrows IS NULL THEN 0 ELSE borrows END AS borrows')
            ])
            ->orderBy('last_seven_days.date')
            ->get();
        return LastSevenDaysBorrowsResource::collection($records);
    }

    public function borrowedBooksCount()
    {
        $borrowedBookCount = Copy::where('availability_status', 0)->count();
        $bookCount = Copy::count();
        return ["borrowedBookCount" => $borrowedBookCount, "bookCount" => $bookCount];
    }
}

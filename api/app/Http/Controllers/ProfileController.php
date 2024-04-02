<?php

namespace App\Http\Controllers;

use App\Http\Resources\BorrowingRecordCollection;
use App\Http\Resources\BorrowingRecordResource;
use App\Models\BorrowingRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function allBorrowedBooks()
    {
        $data = BorrowingRecord::with('fine')
            ->where('user_id', Auth::id())
            ->get();
        return
            new BorrowingRecordCollection($data);
    }

    public function paidBooks()
    {
        $data = BorrowingRecord::with('fine')
            ->where('user_id', Auth::id())
            ->where('payment_status', 1)
            ->get();
        return
            new BorrowingRecordCollection($data);
    }

    public function notPaidBooks()
    {
        $data = BorrowingRecord::with('fine')
            ->where('user_id', Auth::id())
            ->whereHas('fine', function ($query) {
                $query->where('payment_status', 0);
            })
            ->whereNotNull('actual_return_date')
            ->get();
        return
            new BorrowingRecordCollection($data);
    }

    public function lateBooks(Request $request)
    {
        $data = BorrowingRecord::with('fine')
            ->where('user_id', Auth::id())
            ->where('due_date', '<', now())
            ->whereNull('actual_return_date')
            ->get();
        return
            new BorrowingRecordCollection($data);
    }

    public function borrowedBooks(Request $request)
    {
        // new BorrowingRecordResource(
        return BorrowingRecord::with('fine')
            ->where('user_id', Auth::id())
            ->where('due_date', '>', now())
            ->whereNull('actual_return_date')
            ->get();
    }
}

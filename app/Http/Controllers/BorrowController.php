<?php

namespace App\Http\Controllers;

use App\Models\borrowingRecord;
use App\Models\Fine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isNull;

class BorrowController extends Controller
{
    public function showBorrowedBooks() {
        $data = DB::select('SELECT * FROM show_borrowing_info');
        return response()->json($data);
    }

    public function borrowingInfo(Request $request, $borrow_id) {
        $data = borrowingRecord::with('fine')->where('id', $borrow_id)->first();
        return response()->json([$data]);
    }

    public function borrowBook(Request $request) {
        $data = DB::select('CALL borrow(?,?,?)', array((int)$request->user_id, (int)$request->book_id, (int)$request->borrowing_days));
        return response()->json($data);
    }

    public function returnBook(Request $request) {
        $data = DB::select('CALL returnBook(?)', array((int)$request->borrow_id));
        return response()->json($data);
    }

    public function payBorrowedBook(Request $request) {
        $fine = Fine::where('borrowing_record_id', $request->borrow_id)->first();
        if (empty($fine)) {
            return response()->json(["message"=>"Fine Not Exist", 404]);
        } else if ($fine->payment_status == 1) {
            return response()->json(["message"=>"Fine Already Payed"]);
        }
        $fine->payment_status = 1;
        $fine->save();

        return response()->json(["messagae"=>"Fine Is Payed Now"], 202);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Fine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BorrowController extends Controller
{
    public function showBorrowedBooks() {
        $data = DB::select('SELECT * FROM show_borrowing_info');
        return response()->json($data);
    }

    public function borrowBook(Request $request, $user_id, $copy_id) {
        $data = DB::select('CALL borrow(?,?,?)', array((int)$user_id, (int)$copy_id, (int)$request->borrowing_days));
        return response()->json($data);
    }

    public function returnBook(Request $request, $borrow_id) {
        $data = DB::select('CALL returnBook(?)', array((int)$borrow_id));
        return response()->json($data);
    }

    public function payBorrowedBook(Request $request, $borrow_id) {
        $fine = Fine::where('borrowing_record_id', $borrow_id)->first();
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

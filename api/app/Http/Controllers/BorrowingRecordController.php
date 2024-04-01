<?php

namespace App\Http\Controllers;

use App\Http\Resources\BorrowingRecordCollection;
use App\Http\Resources\BorrowingRecordResource;
use App\Models\BorrowingRecord;
use App\Models\Fine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Filters\BorrowingRecordFilter;
use App\Http\Requests\StoreBorrowingRecordRequest;


class BorrowingRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // if ($request->query('includeFine')) {
        //     return new BorrowingRecordCollection(BorrowingRecord::with('fine')->where($queryItems)->paginate());
        // }
        // return new BorrowingRecordCollection(BorrowingRecord::where($queryItems)->paginate());

        $filter = new BorrowingRecordFilter();
        $queryItems = $filter->transform($request);

        $query = DB::table('borrowing_records')
            ->join('users', 'users.id', '=', 'borrowing_records.user_id')
            ->leftJoin('fines', 'borrowing_records.id', '=', 'fines.borrowing_record_id')
            ->select(
                "borrowing_records.id",
                "users.username",
                "borrowing_records.user_id as userId",
                "borrowing_records.copy_id as copyId",
                "borrowing_date as borrowingDate",
                "due_date as dueDate",
                "actual_return_date as actualReturnDate",
                "number_of_late_days as numberOfLateDays",
                "fine_amount as fineAmount",
                "payment_status as paymentStatus"
            );
        $query->where($queryItems)->where(function ($query) use ($request) {
            if ($request->query('notPaid') === "true") {
                $query->where('payment_status', 0)
                    ->whereNotNull('actual_return_date');
            }

            if ($request->query('borrow') === "true") {
                $query->orWhere(function ($query) {
                    $query->whereNull('actual_return_date')
                        ->where('due_date', '>', now());
                });
            }

            if ($request->query('late') === "true") {
                $query->orWhere(function ($query) {
                    $query->where('due_date', '<', now())
                        ->whereNull('actual_return_date');
                });
            }

            if ($request->query('paid') === "true") {
                $query->orWhere(function ($query) {
                    $query->where('payment_status', 1);
                });
            }
        });

        return $query->paginate(10);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBorrowingRecordRequest $request)
    {
        $res = DB::select('CALL borrow(?,?,?)', array($request->userId, $request->bookId, $request->borrowingDays));
        $res = $res[0];
        if (isset($res->error)) {
            return response()->json([
                'status' => 400,
                'message' => $res->error
            ], 400);
        } else {
            return response()->json([
                'status' => 200,
                'message' => "success"
            ], 200);;
        };
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, BorrowingRecord $borrowingRecord)
    {
        if ($request->query('includeFine')) {
            $borrowingRecord = $borrowingRecord->loadMissing('fine');
        }
        return new BorrowingRecordResource($borrowingRecord);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BorrowingRecord $borrowingRecord)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BorrowingRecord $borrowingRecord)
    {
        //
    }

    public function returnBorrowedBook(BorrowingRecord $id)
    {
        $res = DB::select('CALL returnBook(?)', array($id->id));
        $res = $res[0];
        if (isset($res->error)) {
            return response()->json([
                'status' => 400,
                'message' => $res->error
            ], 400);
        } else {
            return response()->json([
                'status' => 200,
                'message' => "success"
            ], 200);;
        };
    }

    public function payBorrowedBook(BorrowingRecord $id)
    {
        if (!isset($id->actual_return_date)) {
            return response()->json([
                'status' => 400,
                'message' => "Book Not Returned"
            ], 400);
        }

        $fine = Fine::where('borrowing_record_id', $id->id)->first();
        if ($fine->payment_status == 1) {
            return response()->json([
                'status' => 400,
                'message' => "Fine Already Payed"
            ], 400);
        }

        $fine->payment_status = 1;
        $fine->save();

        return response()->json(["messagae" => "Fine Is Payed Now"], 202);
    }
}

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
        $filter = new BorrowingRecordFilter();
        $queryItems = $filter->transform($request);

        if ($request->query('includeFine')) {
            return new BorrowingRecordCollection(BorrowingRecord::where($queryItems)->with('fine')->paginate()->appends($request->query()));
        }
        return new BorrowingRecordCollection(BorrowingRecord::where($queryItems)->paginate()->appends($request->query()));

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBorrowingRecordRequest $request)
    {
        return DB::select('CALL borrow(?,?,?)', array($request->user_id, $request->book_id, $request->borrowing_days));
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

    public function returnBorrowedBook(Request $request)
    {
        return DB::select('CALL returnBook(?)', array($request->borrow_id));
    }

    public function payBorrowedBook(Request $request)
    {
        $fine = Fine::where('borrowing_record_id', $request->borrow_id)->first();

        if (empty ($fine)) {
            return response()->json(["message" => "Fine Not Exist", 404]);
        } else if ($fine->payment_status == 1) {
            return response()->json(["message" => "Fine Already Payed"]);
        }
        $fine->payment_status = 1;
        $fine->save();

        return response()->json(["messagae" => "Fine Is Payed Now"], 202);
    }
}

<?php

namespace App\Http\Controllers;

use App\Filters\CopyFilter;
use App\Http\Resources\CopyResource;
use App\Models\Book;
use App\Models\Copy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CopyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $book_id)
    {
        $filter = new CopyFilter();
        $queryItems = $filter->transform($request);
        $queryItems[] = ['book_id', '=', $book_id];

        $copie = Copy::where($queryItems)->paginate();
        return $copie;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Book $book)
    {
        try {
            DB::beginTransaction();

            $numberOfCopies = (int) $request->number;
            $book->number_of_copies += $numberOfCopies;

            $data = [];
            for ($i = 0; $i < $numberOfCopies; $i++) {
                $data[] = ["book_id" => $book->id];
            }

            $timestamp = Carbon::now();
            foreach ($data as &$record) {
                $record['created_at'] = $timestamp;
                $record['updated_at'] = $timestamp;
            }
            Copy::insert($data);
            $book->save();

            DB::commit();
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'error'], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Copy $copy)
    {
        return new CopyResource($copy);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $copy)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Copy $copy)
    {
        $book = Book::findOrFail($copy->book_id);
        try {
            DB::beginTransaction();
            $book->number_of_copies -= 1;
            $book->save();
            $copy->delete();
            DB::commit();
            return response()->json(['message' => 'success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'error'], 400);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Filters\BookFilter;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $filter = new BookFilter();
        $queryItems = $filter->transform($request);


        return DB::table('books')
            ->leftJoin('copies', 'books.id', '=', 'copies.book_id')
            ->leftJoin('categories', 'books.category_id', '=', 'categories.id')
            ->select(
                "books.id as bookId",
                "title",
                "publication_date as publicationDate",
                "additional_details as additionalDetails",
                "isbn",
                "category_id",
                "categories.name as category_name",
                "number_of_copies as numberOfCopies",
                DB::raw("CAST(COALESCE(SUM(availability_status), 0) AS UNSIGNED) as availableCopies")
            )
            ->groupBy('books.id')
            ->where($queryItems)
            ->paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        if (Book::where("isbn", "=", $request->ISBN)->get()->isEmpty()) {
            return new BookResource(Book::create($request->all()));
        }
        return response()->json([
            'message' => 'ISBN already exist',
        ], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $book->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
    }
}

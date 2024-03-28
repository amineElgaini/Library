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
            ->join('copies', 'books.id', '=', 'copies.book_id')
            ->select("book_id as bookId", "title", "additional_details as additionalDetails", "isbn", "genre", "number_of_copies as numberOfCopies", DB::raw("cast(sum(availability_status) as int) as availableCopies"))
            ->groupBy('books.id')
            ->where($queryItems)
            ->paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {

        return new BookResource(Book::create($request->all()));
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

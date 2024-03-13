<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

    class BookController extends Controller
{
    public function index() {
        $books = Book::paginate();
        return response()->json($books);
    }

    public function store(Request $request) {
        $book = new Book;

        $book->title = $request->title;
        $book->ISBN = $request->ISBN;
        $book->publication_date = $request->publication_date;
        $book->genre = $request->genre;
        $book->additional_details = $request->additional_details;
        $book->number_of_copies = 0;

        $book->save();

        return response()->json(["message"=>"book Added"]);
    }

    public function show($id) {
        $book = Book::find($id);
        if (!empty($book)) {
            return response()->json($book);
        } else {
            return response()->json(["message"=>"book not found"], 404);
        }
    }

    public function update(Request $request, $id) {
        if (Book::where('id', $id)->exists()) {
            $book = Book::find($id);

            $book->title = is_null($request->title) ? $book->title : $request->title;
            $book->ISBN = is_null($request->ISBN) ? $book->ISBN : $request->ISBN;
            $book->publication_date = is_null($request->publication_date) ? $book->publication_date : $request->publication_date;
            $book->genre = is_null($request->genre) ? $book->genre : $request->genre;
            $book->additional_details = is_null($request->additional_details) ? $book->additional_details : $request->additional_details;

            $book->save();

            return response()->json(["message"=>"Book Updated", 202]);
        } else {
            return response()->json(["messagae"=>"Book Not Found"], 404);
        }
    }

    public function destroy($id) {
        if (Book::where('id', $id)->exists()) {
            $book = Book::find($id);
            $book->delete();
            return response()->json(["message"=>"records deleted"], 202);
        } else {
            return response()->json(["message"=>"book not found"], 404);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\copie;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CopieController extends Controller
{
    public function index(Request $request, $book_id) {
        $copies = Copie::where('book_id','=',$book_id)->get();

        if (count($copies) == 0)
            return response()->json(["message"=>"book not found"], 404);

        return response()->json($copies);
    }
    
    public function show(Request $request, $copie_id) {
        $copie = Copie::find($copie_id);
        if (empty($copie))
            return response()->json(["message"=>"book not found"], 404);

        return response()->json($copie);
    }
    
    public function store(Request $request, $book_id) {

        $numberOfCopies = (int)$request->number;

        $book = Book::find($book_id);
        if (empty($book))
            return response()->json(["message"=>"book not found"], 404);

        $book->number_of_copies += $numberOfCopies;
        $book->save();

        $data = [];
        for ($i=0; $i < $numberOfCopies; $i++) {
            $data[] = ["book_id"=>$book_id];
        }
        
        $timestamp = Carbon::now();
        foreach ($data as &$record) {
            $record['created_at'] = $timestamp;
            $record['updated_at'] = $timestamp;
        }
        
        Copie::insert($data);
        return response()->json(["message"=>"book Added"]);
    }
    
    public function destroy(Request $request, $copie_id) {
        $copie = Copie::find($copie_id);
        if (empty($copie))
            return response()->json(["message"=>"book not found"], 404);

        $book = Book::find($copie->book_id);
        $book->number_of_copies -= 1;

        $book->save();
        $copie->delete();

        return response()->json(["message"=>"copie deleted"]);
    }
}

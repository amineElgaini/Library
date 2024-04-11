<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateAnAvailableCopyFunction extends Migration
{
    public function up()
    {
        DB::unprepared('
            CREATE FUNCTION `anAvailableCopy`(book_id_value INT) RETURNS INT DETERMINISTIC
            BEGIN
                RETURN (SELECT copies.id FROM books INNER JOIN copies ON books.id = copies.book_id WHERE books.id = book_id_value AND availability_status = 1 LIMIT 1);
            END
        ');
    }

    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS `anAvailableCopy`');
    }
}

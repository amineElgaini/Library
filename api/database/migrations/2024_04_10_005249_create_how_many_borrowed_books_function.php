<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateHowManyBorrowedBooksFunction extends Migration
{
    public function up()
    {
        DB::unprepared('
            CREATE FUNCTION `HowManyBorrowedBooks`(user_id_value INT) RETURNS INT
            BEGIN
                RETURN (SELECT COUNT(*) FROM borrowing_records WHERE user_id = user_id_value);
            END
        ');
    }

    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS `HowManyBorrowedBooks`');
    }
}


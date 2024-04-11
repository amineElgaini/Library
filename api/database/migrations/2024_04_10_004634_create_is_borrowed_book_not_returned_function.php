<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateIsBorrowedBookNotReturnedFunction extends Migration
{
    public function up()
    {
        DB::unprepared('
            CREATE FUNCTION `isBorrowedBookIsNotReturned`(borrowing_record_id_value INT) RETURNS BOOLEAN DETERMINISTIC
            BEGIN
                RETURN EXISTS (SELECT 1 FROM borrowing_records WHERE id = borrowing_record_id_value AND actual_return_date IS NULL);
            END
        ');
    }

    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS `isBorrowedBookIsNotReturned`');
    }
}

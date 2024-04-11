<?php
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Support\Facades\DB;
    
    class CreateHowManyStillBorrowedBooksFunction extends Migration
    {
        public function up()
        {
            DB::unprepared('
                CREATE FUNCTION `HowManyStillBorrowedBooks`(user_id_value INT) RETURNS INT DETERMINISTIC
                BEGIN
                    RETURN (SELECT COUNT(*) FROM borrowing_records WHERE user_id = user_id_value AND actual_return_date IS NULL);
                END
            ');
        }
    
        public function down()
        {
            DB::unprepared('DROP FUNCTION IF EXISTS `HowManyStillBorrowedBooks`');
        }
    }

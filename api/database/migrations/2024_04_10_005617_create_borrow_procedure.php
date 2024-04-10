<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateBorrowProcedure extends Migration
{
    public function up()
    {
        DB::unprepared('
            CREATE PROCEDURE `borrow`(IN user_id_value INT, IN book_id_value INT, IN borrowing_days_value INT)
            BEGIN
                DECLARE copy_id_value INT;
                DECLARE error_message VARCHAR(255) DEFAULT "An Error";
                DECLARE borrowingTime TIMESTAMP DEFAULT NOW();

                DECLARE EXIT HANDLER FOR SQLEXCEPTION
                BEGIN
                    ROLLBACK;
                    SELECT error_message AS error;
                END;

                START TRANSACTION;

                IF NOT userExist(user_id_value) THEN
                    SET error_message = "User Not Found";
                    SIGNAL SQLSTATE "45000";
                END IF;

                SET copy_id_value = anAvailableCopy(book_id_value);

                IF copy_id_value IS NULL THEN
                    SET error_message = "No Available Copies";
                    SIGNAL SQLSTATE "45000";
                END IF;

                UPDATE copies SET availability_status = 0 WHERE id = copy_id_value;

                INSERT INTO borrowing_records(user_id, copy_id, borrowing_date, due_date, created_at, updated_at)
                VALUES (user_id_value, copy_id_value, NOW(), DATE_ADD(NOW(), INTERVAL borrowing_days_value DAY), borrowingTime, borrowingTime);

                COMMIT;
                SELECT "success";

            END
        ');
    }

    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS `borrow`');
    }
}


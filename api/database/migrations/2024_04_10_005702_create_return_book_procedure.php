<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateReturnBookProcedure extends Migration
{
    public function up()
    {
        DB::unprepared('
            CREATE PROCEDURE `returnBook`(IN borrowing_record_id_value INT)
            BEGIN
                DECLARE user_id_value, copy_id_value, number_of_late_days_value, fine_amount_value INT;
                DECLARE return_date_value TIMESTAMP;
                DECLARE error_message VARCHAR(255) DEFAULT "An Error";

                DECLARE EXIT HANDLER FOR SQLEXCEPTION
                BEGIN
                    ROLLBACK;
                    SELECT error_message AS error;
                END;

                START TRANSACTION;

                SET return_date_value = NOW();

                IF isBorrowedBookIsNotReturned(borrowing_record_id_value) THEN
                    UPDATE borrowing_records SET actual_return_date = return_date_value WHERE id = borrowing_record_id_value;

                    SELECT user_id, copy_id, DATEDIFF(actual_return_date, due_date), (DATEDIFF(actual_return_date, borrowing_date) + 1) * (SELECT default_fine_per_day FROM settings_table LIMIT 1)
                    INTO user_id_value, copy_id_value, number_of_late_days_value, fine_amount_value
                    FROM borrowing_records
                    WHERE id = borrowing_record_id_value;

                    UPDATE copies SET availability_status = 1 WHERE id = copy_id_value;

                    INSERT INTO fines(user_id, borrowing_record_id, number_of_late_days, fine_amount, payment_status, created_at, updated_at)
                    VALUES(user_id_value, borrowing_record_id_value, number_of_late_days_value, fine_amount_value, 0, return_date_value, return_date_value);

                    COMMIT;
                    SELECT "success";
                ELSE
                    SET error_message = "Book Already Returned";
                    SIGNAL SQLSTATE "45000";
                END IF;
            END
        ');
    }

    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS `returnBook`');
    }
}

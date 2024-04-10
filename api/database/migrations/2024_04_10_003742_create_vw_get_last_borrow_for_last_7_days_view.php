<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateVwGetLastBorrowForLast7DaysView extends Migration
{
    public function up()
    {
        DB::statement('CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_get_last_borrow_for_last_7_days` AS select cast(`borrowing_records`.`borrowing_date` as date) AS `borrowing_date`,count(0) AS `borrows` from ((`borrowing_records` join `copies` on(`borrowing_records`.`copy_id` = `copies`.`id`)) join `books` on(`books`.`id` = `copies`.`book_id`)) where `borrowing_records`.`borrowing_date` between curdate() - interval 6 day and curdate() + interval 1 day group by cast(`borrowing_records`.`borrowing_date` as date) order by `borrowing_records`.`borrowing_date` limit 7');
    }

    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS `vw_get_last_borrow_for_last_7_days`');
    }
}


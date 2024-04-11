<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateVwGetLastSevenDaysView extends Migration
{
    public function up()
    {
        DB::statement('CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_get_last_seven_days` AS select curdate() + interval 1 day - interval numbers.number day AS `date` from (select 1 AS `number` union select 2 AS `2` union select 3 AS `3` union select 4 AS `4` union select 5 AS `5` union select 6 AS `6` union select 7 AS `7`) numbers');
    }

    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS `vw_get_last_seven_days`');
    }
}

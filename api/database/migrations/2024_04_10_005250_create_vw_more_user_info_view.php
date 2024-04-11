<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateVwMoreUserInfoView extends Migration
{
    public function up()
    {
        DB::statement('CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_more_user_info` AS select `users`.`id` AS `id`,`users`.`username` AS `username`,`users`.`email` AS `email`,`HowManyBorrowedBooks`(`users`.`id`) AS `how_many_borrowed_books`,`HowManyStillBorrowedBooks`(`users`.`id`) AS `how_many_still_borrowed_books` from `users`');
    }

    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS `vw_more_user_info`');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateUserExistFunction extends Migration
{
    public function up()
    {
        DB::unprepared('
            CREATE FUNCTION `userExist`(user_id_value INT) RETURNS BOOLEAN DETERMINISTIC
            BEGIN
                RETURN EXISTS (SELECT 1 FROM users WHERE id = user_id_value);
            END
        ');
    }

    public function down()
    {
        DB::unprepared('DROP FUNCTION IF EXISTS `userExist`');
    }
}

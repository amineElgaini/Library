<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fine extends Model
{
    use HasFactory;

    public function borrowingRecord()
    {
        return $this->hasOne(borrowingRecord::class);
    }
}

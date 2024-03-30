<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'title',
        'ISBN',
        'genre',
        'publication_date',
        'additional_details',
    ];
    
    use HasFactory;
}

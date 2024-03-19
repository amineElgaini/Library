<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'ISBN',
        'genre',
        'publication_date',
        'additional_details',
    ];
    
    use HasFactory;
}

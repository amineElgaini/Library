<?php

namespace App\Filters;

use Illuminate\Http\Request;

class BookFilter extends ApiFilter
{

    protected $safeParms = [
        'title' => ['eq'],
        'genre' => ['eq'],
        'publicationDate' => ['eq', 'gt', 'lt'],
    ];
    protected $columnMap = [
        'publicationDate' => 'publication_date',
    ];
    protected $operatorMap = [
        'eq' => '=',
        'gt' => '>',
        'lt' => '<',
    ];

}
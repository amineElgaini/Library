<?php

namespace App\Filters;

use Illuminate\Http\Request;

class BookFilter extends ApiFilter
{

    protected $safeParms = [
        'title' => ['eq', 'like'],
        'categoryId' => ['eq'],
        'publicationDate' => ['eq', 'gt', 'lt'],
    ];
    protected $columnMap = [
        'publicationDate' => 'publication_date',
        'categoryId' => 'category_id',
    ];
    protected $operatorMap = [
        'eq' => '=',
        'gt' => '>',
        'lt' => '<',
        'like' => 'like',
    ];

}
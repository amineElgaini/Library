<?php

namespace App\Filters;

use Illuminate\Http\Request;

class BorrowingRecordFilter extends ApiFilter
{

    protected $safeParms = [
        'bookId' => ['eq'],
        'userId' => ['eq'],
        'borrowingDate' => ['eq', 'gt', 'lt'],
        'dueDate' => ['eq', 'gt', 'lt'],
        'actualReturnDate' => ['eq', 'gt', 'lt'],
    ];
    protected $columnMap = [
        'bookId' => 'book_id',
        'userId' => 'user_id',
        'borrowingDate' => 'borrowing_date',
        'dueDate' => 'due_date',
        'actualReturnDate' => 'actual_return_date'
    ];
    protected $operatorMap = [
        'eq' => '=',
        'gt' => '>',
        'lt' => '<',
    ];

}
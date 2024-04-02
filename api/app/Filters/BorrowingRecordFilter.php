<?php

namespace App\Filters;

use Illuminate\Http\Request;

class BorrowingRecordFilter extends ApiFilter
{

    protected $safeParms = [
        'copyId' => ['eq'],
        'userId' => ['eq'],
        'username' => ['eq', 'like'],
        'borrowingDate' => ['eq', 'gte', 'lte'],
        'dueDate' => ['eq', 'gte', 'lte'],
        'actualReturnDate' => ['eq', 'gte', 'lte'],
        'paymentStatus' => ['eq', 'neq'],
    ];
    protected $columnMap = [
        'copyId' => 'copy_id',
        'userId' => 'user_id',
        'borrowingDate' => 'borrowing_date',
        'dueDate' => 'due_date',
        'actualReturnDate' => 'actual_return_date',
        'paymentStatus' => 'payment_status'
    ];
    protected $operatorMap = [
        'eq' => '=',
        'neq' => '!=',
        'gt' => '>',
        'gte' => '>=',
        'lt' => '<',
        'lte' => '<=',
        'like' => 'like',
    ];
}

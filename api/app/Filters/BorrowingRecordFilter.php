<?php

namespace App\Filters;

use Illuminate\Http\Request;

class BorrowingRecordFilter extends ApiFilter
{

    protected $safeParms = [
        'copyId' => ['eq'],
        'userId' => ['eq'],
        'borrowingDate' => ['eq', 'gt', 'lt'],
        'dueDate' => ['eq', 'gt', 'lt'],
        'actualReturnDate' => ['eq', 'gt', 'lt'],
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
        'lt' => '<',
    ];
}

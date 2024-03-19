<?php

namespace App\Filters;

use Illuminate\Http\Request;

class CopyFilter extends ApiFilter
{

    protected $safeParms = [
        'availabilityStatus' => ['eq'],
    ];
    protected $columnMap = [
        'availabilityStatus' => 'availability_status',
    ];
    protected $operatorMap = [
        'eq' => '=',
        // 'gt' => '>',
        // 'lt' => '<',
    ];

}
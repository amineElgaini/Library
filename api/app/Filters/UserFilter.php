<?php

namespace App\Filters;

use Illuminate\Http\Request;

class UserFilter extends ApiFilter
{
    protected $safeParms = [
        'name' => ['eq'],
    ];
    protected $columnMap = [];
    protected $operatorMap = [
        'eq' => '=',
    ];


}
<?php

namespace App\Filters;

use Illuminate\Http\Request;

class UserFilter extends ApiFilter
{
    protected $safeParms = [
        'username' => ['eq', 'like'],
    ];
    protected $columnMap = [];
    protected $operatorMap = [
        'eq' => '=',
        'like' => 'like',
    ];
}

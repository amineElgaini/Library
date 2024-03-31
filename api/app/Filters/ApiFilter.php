<?php

namespace App\Filters;

use Illuminate\Http\Request;

class ApiFilter
{
    protected $safeParms = [];
    protected $columnMap = [];
    protected $operatorMap = [];

    public function transform(Request $request)
    {
        $eloQuery = [];

        foreach ($this->safeParms as $parm => $operators) {
            $query = $request->query($parm);

            if (!isset($query))
                continue;

            $column = $this->columnMap[$parm] ?? $parm;
            foreach ($operators as $operator) {
                // if (isset($query[$operator])) { // old code
                if (array_key_exists($operator, $query)) {
                    if ($this->operatorMap[$operator] === "like") {
                        $eloQuery[] = [$column, $this->operatorMap[$operator], "%" . $query[$operator] . "%"];
                    } else {
                        $eloQuery[] = [$column, $this->operatorMap[$operator], $query[$operator]];
                    }
                }
            }
        }
        return $eloQuery;
    }
}

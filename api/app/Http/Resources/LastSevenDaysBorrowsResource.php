<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LastSevenDaysBorrowsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->date,
            'dayName' => $this->day_name,
            'dayNumber' => $this->day_number,
            'borrows' => $this->borrows,
        ];
    }
}

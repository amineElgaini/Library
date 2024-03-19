<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'numberOfLateDays'=>$this->number_of_late_days,
            'fineAmount'=>$this->fine_amount,
            'paymentStatus'=>$this->payment_status,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CopyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'copyId'=>$this->id,
            'bookId'=>$this->book_id,
            'availabilityStatus'=>$this->availability_status,
        ];
    }
}

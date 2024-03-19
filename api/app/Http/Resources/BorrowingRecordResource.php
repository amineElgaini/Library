<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BorrowingRecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "userId"=>$this->user_id,
            "copyId"=>$this->copy_id,
            "borrowingDate"=>$this->borrowing_date,
            "dueDate"=>$this->due_date,
            "actualReturnDate"=>$this->actual_return_date,
            "fine"=>FineResource::make($this->whenLoaded('fine')),            
        ];
    }
}

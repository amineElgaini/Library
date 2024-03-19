<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
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
            'title'=>$this->title,
            'ISBN'=>$this->ISBN,
            'publicationDate'=>$this->publication_date,
            'genre'=>$this->genre,
            'additionalDetails'=>$this->additional_details,
            'numberOfCopies'=>$this->number_of_copies,
        ];
    }
}

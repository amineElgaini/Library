<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => ['required', 'string'],
            "ISBN" => ['required', 'string', 'unique:books,isbn'],
            "genre" => ['required', 'string'],
            "publicationDate" => ['required', 'date'],
            "additionalDetails" => ['required', 'string']
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            "publication_date" => $this->publicationDate,
            "additional_details" => $this->additionalDetails
        ]);
    }
}

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
            "ISBN" => ['required', 'string', 'unique:books,isbn'],
            "title" => ['required', 'string'],
            "categoryId" => ['required', 'integer'],
            "publicationDate" => ['required', 'date'],
            "additionalDetails" => ['required', 'string']
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            "category_id" => $this->categoryId,
            "publication_date" => $this->publicationDate,
            "additional_details" => $this->additionalDetails
        ]);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
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
        $method = $this->method();

        if ($method == 'PUT') {
            return [
                "title" => ['required', 'string'],
                "ISBN" => ['required', 'string'],
                "genre" => ['required', 'string'],
                "publicationDate" => ['required', 'date'],
                "additionalDetails" => ['required', 'string']
            ];
        } else {
            return [
                "title" => ['sometimes', 'required', 'string'],
                "ISBN" => ['sometimes', 'required', 'string'],
                "genre" => ['sometimes', 'required', 'string'],
                "publicationDate" => ['sometimes', 'required', 'date'],
                "additionalDetails" => ['sometimes', 'required', 'string']
            ];
        }
    }
}

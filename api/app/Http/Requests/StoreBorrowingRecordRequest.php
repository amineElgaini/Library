<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBorrowingRecordRequest extends FormRequest
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
            "userId" => ['required', 'integer'],
            "bookId" => ['required', 'integer'],
            "borrowingDays" => ['required', 'integer']
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            "user_id" => $this->userId,
            "book_id" => $this->bookId,
            "borrowing_days" => $this->borrowingDays
        ]);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
                'username' => ['string', 'required', 'unique:users,username'],
                'email' => ['required', 'email'],
                'password' => ['required'],
            ];
        } else {
            return [
                'username' => ['sometimes', 'string', 'required', 'unique:users,username'],
                'email' => ['sometimes', 'required', 'email'],
                'password' => ['sometimes', 'required'],
            ];
        }
    }
}

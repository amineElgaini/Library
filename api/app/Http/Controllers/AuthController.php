<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();
        if (!$user) {
            return response()->json(["message" => "user not found"], 401);
        }
        if (!Hash::check($request->input("password"), $user->password)) {
            return response()->json(["message" => "wrong password"], 401);
        }

        $token = $user->createToken("auth_token")->plainTextToken;
        $roles = $user->permissions()->get()->pluck('id');

        return response()->json(['roles' => $roles, 'username' => $user->username, 'token' => $token]);
    }

    public function getLogedInUserInfo(Request $request)
    {
        $user = $request->user();
        $roles = $user->permissions()->get()->pluck('id');

        return response()->json(['roles' => $roles, 'username' => $user->username]);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'loged out',
        ], 200);
    }
}

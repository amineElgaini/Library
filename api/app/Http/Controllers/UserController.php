<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Filters\UserFilter;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UserFilter();
        $queryItems = $filter->transform($request);
        $users = User::where($queryItems)->paginate();
        return new UserCollection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $newUser = User::create($request->all());
        if ($newUser) {
            return new UserResource($newUser);
        }
        return response()->json([
            'message' => 'User Not Created'
        ], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource(DB::select("SELECT * FROM vw_more_user_info where id = $user->id")[0]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if ($user->update($request->all())) {
            return response()->json([
                'message' => 'User updated successfully'
            ], 200);
        }
        return response()->json([
            'message' => 'User Not Updated'
        ], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json([
                'message' => 'User deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete user: '
            ], 400);
        }
    }

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

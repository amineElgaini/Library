<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Filters\UserFilter;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
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
        $user = User::select([
            'id',
            'username',
            'email',
            User::raw('HowManyBorrowedBooks(users.id) as how_many_borrowed_books'),
            User::raw('HowManyStillBorrowedBooks(users.id) as how_many_still_borrowed_books')
        ])->where('id', $user->id)
            ->first();
        return new UserResource($user);
    }


    public function findByUsername(User $username)
    {
        return new UserResource($username);
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
}

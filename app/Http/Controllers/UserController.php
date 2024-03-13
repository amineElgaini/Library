<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        $users = User::paginate();
        return response()->json($users);   
    }

    public function show($id) {
        $user = User::find($id);
        return response()->json($user);
    }

    public function update(Request $request, $id) {
        $user = User::find($id);
        if (!empty($user)) {

            $user->name = is_null($request->name) ? $user->name : $request->name;
            $user->email = is_null($request->email) ? $user->email : $request->email;
            $user->password = is_null($request->password) ? $user->password : $request->password;

            $user->save();

            return response()->json(["message"=>"User Updated", 202]);
        } else {
            return response()->json(["messagae"=>"User Not Found"], 404);
        }
    }

    public function store(Request $request) {
        $user = new User;

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;

        $user->save();

        return response()->json(["message"=>"user Added"]);
    }

    public function destroy($id) {
        $user = User::find($id);
        if (!empty($user)) {
            $user->delete();
            return response()->json(["message"=>"records deleted"], 202);
        } else {
            return response()->json(["message"=>"user not found"], 404);
        }
    }
}

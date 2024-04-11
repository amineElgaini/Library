<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create the admin role
        $adminPermission = Permission::create([
            'title' => 'admin',
        ]);

        // Create a user
        $user = User::factory()->create([
            'username' => 'amine1',
            'email' => 'amine1@gmail.com',
            'password' => bcrypt('amine1'),
        ]);

        // Attach the admin role to the user
        $user->permissions()->attach($adminPermission);
    }
}

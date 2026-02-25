<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin
        Admin::create([
            'name' => 'Administrator',
            'email' => 'admin@agrowaste.com',
            'password' => Hash::make('admin123'),
        ]);

        // Create Users
        User::create([
            'name' => 'User Demo',
            'email' => 'user@agrowaste.com',
            'password' => Hash::make('user123'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@gmail.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Siti Rahayu',
            'email' => 'siti@gmail.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        $this->call([
            AdminSeeder::class,
        ]);
    }
}

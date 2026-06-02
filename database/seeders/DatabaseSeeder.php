<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\User;
use App\Models\Module;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::create([
            'name' => 'Admin',
            'description' => 'Administrator with full access'
        ]);

        $userRole = Role::create([
            'name' => 'User',
            'description' => 'Regular user with limited access'
        ]);

        // Create admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@agrowaste.com',
            'password' => Hash::make('admin123'),
            'role_id' => $adminRole->id,
            'phone' => '08123456789',
            'address' => 'Jakarta, Indonesia'
        ]);

        // Create test user
        User::create([
            'name' => 'Test User',
            'email' => 'user@agrowaste.com',
            'password' => Hash::make('user123'),
            'role_id' => $userRole->id,
            'phone' => '08987654321',
            'address' => 'Bandung, Indonesia'
        ]);

        // Create sample modules
        Module::create([
            'title' => 'Pengantar Pengelolaan Limbah Pertanian',
            'slug' => 'pengantar-pengelolaan-limbah-pertanian',
            'description' => 'Modul dasar tentang pentingnya pengelolaan limbah pertanian yang berkelanjutan',
            'content' => 'Konten modul pengantar...',
            'order' => 1,
            'is_active' => true,
            'duration_minutes' => 30,
            'level' => 'beginner'
        ]);

        Module::create([
            'title' => 'Kompos dari Limbah Pertanian',
            'slug' => 'kompos-dari-limbah-pertanian',
            'description' => 'Cara membuat kompos berkualitas dari limbah pertanian',
            'content' => 'Konten modul kompos...',
            'order' => 2,
            'is_active' => true,
            'duration_minutes' => 45,
            'level' => 'intermediate'
        ]);
    }
}
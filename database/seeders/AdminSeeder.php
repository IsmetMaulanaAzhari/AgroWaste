<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Admin::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'password', // Model sudah auto-hash dengan cast
        ]);

        // Create sample products
        \App\Models\Product::create([
            'name' => 'Pupuk Kompos Organik',
            'description' => 'Pupuk kompos berkualitas tinggi dari limbah organik yang telah difermentasi.',
            'price' => 25000,
            'stock' => 100,
            'category' => 'organic',
            'is_active' => true,
        ]);

        \App\Models\Product::create([
            'name' => 'Tas Daur Ulang',
            'description' => 'Tas ramah lingkungan terbuat dari bahan daur ulang.',
            'price' => 50000,
            'stock' => 50,
            'category' => 'recycled',
            'is_active' => true,
        ]);

        // Create sample wastes
        \App\Models\Waste::create([
            'name' => 'Kulit Buah',
            'description' => 'Limbah kulit buah yang dapat dijadikan kompos atau pupuk organik.',
            'type' => 'organic',
            'recycling_process' => 'Dapat dikompos dengan cara mencampurkan dengan tanah dan dibiarkan hingga membusuk.',
            'benefits' => 'Menghasilkan pupuk organik yang bagus untuk tanaman.',
            'is_recyclable' => true,
        ]);

        \App\Models\Waste::create([
            'name' => 'Botol Plastik',
            'description' => 'Botol plastik bekas yang dapat didaur ulang menjadi berbagai produk.',
            'type' => 'plastic',
            'recycling_process' => 'Dibersihkan, dipotong, dan diolah kembali menjadi produk plastik baru.',
            'benefits' => 'Mengurangi sampah plastik dan menghasilkan produk baru.',
            'is_recyclable' => true,
        ]);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'price',
        'stock',
        'category',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    // Scope untuk produk aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk kategori
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}

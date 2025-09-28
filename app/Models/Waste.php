<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Waste extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'type',
        'recycling_process',
        'benefits',
        'is_recyclable',
    ];

    protected function casts(): array
    {
        return [
            'is_recyclable' => 'boolean',
        ];
    }

    // Scope untuk limbah yang dapat didaur ulang
    public function scopeRecyclable($query)
    {
        return $query->where('is_recyclable', true);
    }

    // Scope untuk tipe limbah
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}

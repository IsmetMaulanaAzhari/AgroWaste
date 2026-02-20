<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LearningModule extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function videos()
    {
        return $this->hasMany(Video::class, 'learning_module_id');
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class, 'learning_module_id');
    }
}

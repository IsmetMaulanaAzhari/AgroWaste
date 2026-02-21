<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'learning_module_id',
        'title',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function module()
    {
        return $this->belongsTo(LearningModule::class, 'learning_module_id');
    }

    public function learningModule()
    {
        return $this->belongsTo(LearningModule::class, 'learning_module_id');
    }

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class);
    }
}

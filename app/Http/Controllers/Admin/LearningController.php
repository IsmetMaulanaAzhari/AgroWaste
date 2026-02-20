<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LearningModule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearningController extends Controller
{
    public function index()
    {
        $modules = LearningModule::with(['videos', 'quizzes'])
            ->withCount(['videos', 'quizzes'])
            ->orderBy('order')
            ->get();

        return Inertia::render('Admin/Learning/Index', [
            'modules' => $modules
        ]);
    }
}
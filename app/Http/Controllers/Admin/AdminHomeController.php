<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Module;
use App\Models\Video;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Inertia\Inertia;

class AdminHomeController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::where('role_id', 2)->count(),
            'total_modules' => Module::count(),
            'active_modules' => Module::where('is_active', true)->count(),
            'total_videos' => Video::count(),
            'total_quizzes' => Quiz::count(),
            'total_quiz_attempts' => QuizAttempt::count(),
            'passed_attempts' => QuizAttempt::where('is_passed', true)->count(),
        ];

        return Inertia::render('Admin/Home', compact('stats'));
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Module;
use App\Models\Video;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
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

        // Recent quiz attempts
        $recentAttempts = QuizAttempt::with(['user', 'quiz.module'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        // Module completion stats
        $modules = Module::withCount([
            'userProgress',
            'userProgress as completed_count' => function ($query) {
                $query->where('module_completed', true)
                      ->where('video_completed', true)
                      ->where('quiz_completed', true);
            }
        ])->get();

        return Inertia::render('Admin/Dashboard', compact('stats', 'recentAttempts', 'modules'));
    }
}

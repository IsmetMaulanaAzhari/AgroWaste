<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\LearningModule;
use App\Models\Video;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Get basic stats
        $stats = [
            'totalUsers' => User::count(),
            'totalModules' => LearningModule::count(),
            'totalVideos' => Video::count(),
            'totalQuizzes' => Quiz::count(),
        ];

        // Get recent modules
        $recentModules = LearningModule::withCount(['videos', 'quizzes'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Get activity data for the last 7 days
        $dates = collect(range(6, 0))->map(function ($day) {
            return Carbon::now()->subDays($day)->format('Y-m-d');
        });

        // In a real application, you would have VideoView and QuizCompletion models
        // Here we'll just generate random data for demonstration
        $activityData = [
            'dates' => $dates->map(fn($date) => Carbon::parse($date)->format('d M')),
            'videoViews' => $dates->map(fn() => rand(10, 50)),
            'quizCompletions' => $dates->map(fn() => rand(5, 30)),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentModules' => $recentModules,
            'activityData' => $activityData,
        ]);
    }
}
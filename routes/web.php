<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\User\LearningController;
use App\Models\LearningModule;
use App\Models\Video;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => [
            'user' => auth()->user(),
        ],
        'stats' => [
            'modules' => LearningModule::where('is_active', true)->count(),
            'videos' => Video::where('is_active', true)->count(),
            'users' => User::count(),
        ],
    ]);
});

// User Dashboard
Route::get('/dashboard', [LearningController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// User Learning Routes
Route::middleware(['auth', 'verified'])->prefix('learning')->name('learning.')->group(function () {
    Route::get('/', [LearningController::class, 'index'])->name('index');
    Route::get('/modules', [LearningController::class, 'modules'])->name('modules');
    Route::get('/modules/{module}', [LearningController::class, 'showModule'])->name('modules.show');
    Route::get('/videos', [LearningController::class, 'videos'])->name('videos');
    Route::get('/videos/{video}', [LearningController::class, 'showVideo'])->name('videos.show');
    Route::get('/quizzes', [LearningController::class, 'quizzes'])->name('quizzes');
    Route::get('/quizzes/{quiz}', [LearningController::class, 'showQuiz'])->name('quizzes.show');
    Route::post('/quizzes/{quiz}/submit', [LearningController::class, 'submitQuiz'])->name('quizzes.submit');
});

// User Profile Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    // Guest routes (login)
    Route::middleware('guest:admin')->group(function () {
        Route::get('login', [AdminAuthController::class, 'showLogin'])->name('login');
        Route::post('login', [AdminAuthController::class, 'login'])->name('login.submit');
    });

    // Protected admin routes
    Route::middleware('auth:admin')->group(function () {
        Route::post('logout', [AdminAuthController::class, 'logout'])->name('logout');
        Route::get('dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
        
        // Learning Management
        Route::prefix('learning')->name('learning.')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\LearningController::class, 'index'])->name('index');
            Route::resource('modules', App\Http\Controllers\Admin\LearningModuleController::class);
            Route::resource('videos', App\Http\Controllers\Admin\VideoController::class);
            Route::resource('quizzes', App\Http\Controllers\Admin\QuizController::class);
            Route::resource('quizzes.questions', App\Http\Controllers\Admin\QuizQuestionController::class);
        });
    });
});

require __DIR__.'/auth.php';

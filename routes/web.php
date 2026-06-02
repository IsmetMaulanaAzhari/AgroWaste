<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\QuizController;

// Test page (for debugging)
Route::get('/test', function () {
    return \Inertia\Inertia::render('Test');
});

// Debug auth
Route::get('/debug-auth', function () {
    $user = auth()->user();
    return response()->json([
        'logged_in' => auth()->check(),
        'user' => $user,
        'is_admin' => $user ? $user->isAdmin() : false,
        'role_id' => $user ? $user->role_id : null,
    ]);
});

// Landing page
Route::get('/', [HomeController::class, 'landing'])->name('landing');

// Authentication routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Admin routes
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/home', [\App\Http\Controllers\Admin\AdminHomeController::class, 'index'])->name('home');
    Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Module management routes (to be implemented)
    Route::resource('modules', \App\Http\Controllers\Admin\AdminModuleController::class);
    Route::resource('videos', \App\Http\Controllers\Admin\AdminVideoController::class);
    Route::resource('quizzes', \App\Http\Controllers\Admin\AdminQuizController::class);
    Route::resource('users', \App\Http\Controllers\Admin\AdminUserController::class);
});

// Protected routes (requires authentication)
Route::middleware('auth')->group(function () {
    // Home/Dashboard
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    
    // Modules
    Route::get('/modules', [ModuleController::class, 'index'])->name('modules.index');
    Route::get('/modules/{slug}', [ModuleController::class, 'show'])->name('modules.show');
    Route::post('/modules/{id}/complete', [ModuleController::class, 'markComplete'])->name('modules.complete');
    
    // Videos
    Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
    Route::get('/videos/{id}', [VideoController::class, 'show'])->name('videos.show');
    Route::post('/videos/{id}/complete', [VideoController::class, 'markComplete'])->name('videos.complete');
    
    // Quizzes
    Route::get('/quizzes', [QuizController::class, 'index'])->name('quizzes.index');
    Route::get('/quizzes/{id}', [QuizController::class, 'show'])->name('quizzes.show');
    Route::get('/quizzes/{id}/start', [QuizController::class, 'start'])->name('quizzes.start');
    Route::post('/quizzes/{id}/submit', [QuizController::class, 'submit'])->name('quizzes.submit');
    Route::get('/quizzes/result/{attemptId}', [QuizController::class, 'result'])->name('quizzes.result');
    
    // Profile
    Route::get('/profile', [HomeController::class, 'profile'])->name('profile.edit');
    Route::put('/profile', [HomeController::class, 'updateProfile'])->name('profile.update');
});

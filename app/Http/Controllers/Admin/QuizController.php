<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\LearningModule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quizzes = Quiz::with(['learningModule', 'questions'])
            ->orderBy('learning_module_id')
            ->orderBy('order')
            ->paginate(10);
        
        $modules = LearningModule::where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Admin/Quizzes/Index', [
            'quizzes' => $quizzes,
            'modules' => $modules
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        $quiz->load(['questions' => function ($query) {
            $query->orderBy('order');
        }]);

        return Inertia::render('Admin/Quizzes/Show', [
            'quiz' => $quiz
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'learning_module_id' => 'required|exists:learning_modules,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'nullable|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        Quiz::create($validated);

        return redirect()->route('admin.quizzes.index')
            ->with('message', 'Kuis berhasil dibuat');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'learning_module_id' => 'required|exists:learning_modules,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'nullable|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $quiz->update($validated);

        return redirect()->route('admin.quizzes.index')
            ->with('message', 'Kuis berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->questions()->delete(); // Delete all related questions
        $quiz->delete();

        return redirect()->route('admin.quizzes.index')
            ->with('message', 'Kuis berhasil dihapus');
    }
}

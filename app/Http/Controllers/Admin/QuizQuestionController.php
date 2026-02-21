<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuizQuestion;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Quiz $quiz)
    {
        $questions = $quiz->questions()
            ->orderBy('order')
            ->get();

        return Inertia::render('Admin/Questions/Index', [
            'quiz' => $quiz,
            'questions' => $questions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string|distinct',
            'correct_answer' => 'required|integer|min:0|max:' . (count($request->options) - 1),
            'explanation' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'points' => 'required|integer|min:1',
        ]);

        $quiz->questions()->create($validated);

        return redirect()->route('admin.learning.quizzes.show', $quiz)
            ->with('message', 'Pertanyaan berhasil ditambahkan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz, QuizQuestion $question)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string|distinct',
            'correct_answer' => 'required|integer|min:0|max:' . (count($request->options) - 1),
            'explanation' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'points' => 'required|integer|min:1',
        ]);

        $question->update($validated);

        return redirect()->route('admin.learning.quizzes.show', $quiz)
            ->with('message', 'Pertanyaan berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz, QuizQuestion $question)
    {
        $question->delete();

        return redirect()->route('admin.learning.quizzes.show', $quiz)
            ->with('message', 'Pertanyaan berhasil dihapus');
    }

    /**
     * Update questions order
     */
    public function reorder(Request $request, Quiz $quiz)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:quiz_questions,id',
            'orders.*.order' => 'required|integer|min:0'
        ]);

        foreach ($request->orders as $item) {
            QuizQuestion::where('id', $item['id'])
                ->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Urutan pertanyaan berhasil diperbarui']);
    }
}

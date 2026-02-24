<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\LearningModule;
use App\Models\Video;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearningController extends Controller
{
    public function dashboard()
    {
        $modules = LearningModule::where('is_active', true)
            ->withCount(['videos', 'quizzes'])
            ->orderBy('order')
            ->take(6)
            ->get();

        $videos = Video::where('is_active', true)
            ->with('learningModule')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        $quizzes = Quiz::where('is_active', true)
            ->with('learningModule')
            ->withCount('questions')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        return Inertia::render('User/Dashboard', [
            'modules' => $modules,
            'videos' => $videos,
            'quizzes' => $quizzes,
            'stats' => [
                'totalModules' => LearningModule::where('is_active', true)->count(),
                'totalVideos' => Video::where('is_active', true)->count(),
                'totalQuizzes' => Quiz::where('is_active', true)->count(),
            ],
        ]);
    }

    public function index()
    {
        return $this->dashboard();
    }

    public function modules()
    {
        $modules = LearningModule::where('is_active', true)
            ->withCount(['videos', 'quizzes'])
            ->orderBy('order')
            ->paginate(12);

        return Inertia::render('User/Modules/Index', [
            'modules' => $modules,
        ]);
    }

    public function showModule(LearningModule $module)
    {
        $module->load(['videos' => function ($query) {
            $query->where('is_active', true)->orderBy('order');
        }, 'quizzes' => function ($query) {
            $query->where('is_active', true)->orderBy('order');
        }]);

        return Inertia::render('User/Modules/Show', [
            'module' => $module,
        ]);
    }

    public function videos()
    {
        $videos = Video::where('is_active', true)
            ->with('learningModule')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('User/Videos/Index', [
            'videos' => $videos,
        ]);
    }

    public function showVideo(Video $video)
    {
        $video->load('learningModule');

        // Get related videos from same module
        $relatedVideos = Video::where('is_active', true)
            ->where('learning_module_id', $video->learning_module_id)
            ->where('id', '!=', $video->id)
            ->take(5)
            ->get();

        return Inertia::render('User/Videos/Show', [
            'video' => $video,
            'relatedVideos' => $relatedVideos,
        ]);
    }

    public function quizzes()
    {
        $quizzes = Quiz::where('is_active', true)
            ->with('learningModule')
            ->withCount('questions')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return Inertia::render('User/Quizzes/Index', [
            'quizzes' => $quizzes,
        ]);
    }

    public function showQuiz(Quiz $quiz)
    {
        $quiz->load(['learningModule', 'questions' => function ($query) {
            $query->orderBy('order');
        }]);

        // Don't expose correct answers to frontend
        $quiz->questions->transform(function ($question) {
            return [
                'id' => $question->id,
                'question' => $question->question,
                'options' => $question->options,
                'points' => $question->points,
            ];
        });

        return Inertia::render('User/Quizzes/Show', [
            'quiz' => $quiz,
        ]);
    }

    public function submitQuiz(Request $request, Quiz $quiz)
    {
        $answers = $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'required|string',
        ])['answers'];

        $quiz->load('questions');
        
        $totalPoints = 0;
        $earnedPoints = 0;
        $results = [];

        foreach ($quiz->questions as $question) {
            $totalPoints += $question->points;
            $userAnswer = $answers[$question->id] ?? null;
            $isCorrect = $userAnswer === (string) $question->correct_answer;
            
            if ($isCorrect) {
                $earnedPoints += $question->points;
            }

            $results[] = [
                'question_id' => $question->id,
                'question' => $question->question,
                'options' => $question->options,
                'user_answer' => $userAnswer,
                'correct_answer' => $question->correct_answer,
                'is_correct' => $isCorrect,
                'explanation' => $question->explanation,
                'points' => $question->points,
            ];
        }

        $score = $totalPoints > 0 ? round(($earnedPoints / $totalPoints) * 100) : 0;
        $passed = $score >= ($quiz->passing_score ?? 70);

        return response()->json([
            'score' => $score,
            'passed' => $passed,
            'earned_points' => $earnedPoints,
            'total_points' => $totalPoints,
            'passing_score' => $quiz->passing_score ?? 70,
            'results' => $results,
        ]);
    }
}

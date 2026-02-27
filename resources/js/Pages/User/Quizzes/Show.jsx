import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Show({ auth, quiz }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const questions = quiz.questions || [];
    const totalQuestions = questions.length;

    const handleAnswer = (questionId, answerIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: String(answerIndex)
        }));
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < totalQuestions) {
            alert('Mohon jawab semua pertanyaan terlebih dahulu!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(route('learning.quizzes.submit', quiz.id), {
                answers: answers
            });

            setResult(response.data);
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            if (error.response?.status === 401) {
                alert('Sesi Anda telah berakhir. Silakan login kembali.');
                window.location.href = route('login');
            } else {
                alert('Terjadi kesalahan saat mengirim jawaban');
            }
        }
        setLoading(false);
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setSubmitted(false);
        setResult(null);
    };

    if (submitted && result) {
        return (
            <>
                <Head title={`Hasil Kuis - ${quiz.title}`} />
                
                <div className="min-h-screen bg-gray-50">
                    {/* Header */}
                    <header className="bg-white shadow-sm">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center py-4">
                                <Link href={route('dashboard')} className="flex items-center">
                                    <span className="text-2xl mr-2">🌾</span>
                                    <span className="text-xl font-bold text-green-600">AgroWaste Academy</span>
                                </Link>
                            </div>
                        </div>
                    </header>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Result Card */}
                        <div className={`rounded-2xl p-8 text-center mb-8 ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}>
                            <div className="text-6xl mb-4">{result.passed ? '🎉' : '😔'}</div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {result.passed ? 'Selamat! Anda Lulus!' : 'Belum Berhasil'}
                            </h1>
                            <div className="text-6xl font-bold text-white mb-2">{result.score}%</div>
                            <p className="text-white/90">
                                Nilai minimum kelulusan: {result.passing_score}%
                            </p>
                            <p className="text-white/80 mt-2">
                                {result.earned_points} dari {result.total_points} poin
                            </p>
                        </div>

                        {/* Detail Results */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">Detail Jawaban</h2>
                            </div>
                            <div className="divide-y">
                                {result.results.map((item, index) => (
                                    <div key={item.question_id} className="p-6">
                                        <div className="flex items-start space-x-3">
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                item.is_correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {item.is_correct ? '✓' : '✗'}
                                            </span>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 mb-3">
                                                    {index + 1}. {item.question}
                                                </h3>
                                                <div className="space-y-2">
                                                    {item.options.map((option, optIndex) => {
                                                        const isUserAnswer = item.user_answer === String(optIndex);
                                                        const isCorrectAnswer = String(item.correct_answer) === String(optIndex);
                                                        
                                                        let bgColor = 'bg-gray-50';
                                                        if (isCorrectAnswer) bgColor = 'bg-green-50 border-green-300';
                                                        else if (isUserAnswer && !item.is_correct) bgColor = 'bg-red-50 border-red-300';

                                                        return (
                                                            <div 
                                                                key={optIndex}
                                                                className={`p-3 rounded-lg border ${bgColor}`}
                                                            >
                                                                <span className="font-medium mr-2">
                                                                    {String.fromCharCode(65 + optIndex)}.
                                                                </span>
                                                                {option}
                                                                {isCorrectAnswer && <span className="ml-2 text-green-600">✓ Jawaban Benar</span>}
                                                                {isUserAnswer && !item.is_correct && <span className="ml-2 text-red-600">← Jawaban Anda</span>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {item.explanation && (
                                                    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                                                        💡 <strong>Penjelasan:</strong> {item.explanation}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex justify-center space-x-4">
                            <button
                                onClick={handleRetry}
                                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
                            >
                                🔄 Coba Lagi
                            </button>
                            <Link
                                href={route('dashboard')}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition-colors"
                            >
                                ← Kembali ke Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={`${quiz.title} - AgroWaste Academy`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <Link href={route('dashboard')} className="flex items-center">
                                <span className="text-2xl mr-2">🌾</span>
                                <span className="text-xl font-bold text-green-600">AgroWaste Academy</span>
                            </Link>
                            <div className="text-sm text-gray-500">
                                Soal {currentQuestion + 1} dari {totalQuestions}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Quiz Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
                        <p className="text-gray-600">{quiz.description}</p>
                        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                            <span>❓ {totalQuestions} Soal</span>
                            {quiz.duration && <span>⏱ {quiz.duration} menit</span>}
                            <span>🎯 Nilai minimum: {quiz.passing_score || 70}%</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Card */}
                    {questions.length > 0 && (
                        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                            <div className="mb-6">
                                <span className="text-sm text-green-600 font-medium">Soal {currentQuestion + 1}</span>
                                <h2 className="text-xl font-semibold text-gray-800 mt-2">
                                    {questions[currentQuestion].question}
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(questions[currentQuestion].id, index)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                            answers[questions[currentQuestion].id] === String(index)
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                                            answers[questions[currentQuestion].id] === String(index)
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                        }`}>
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                                currentQuestion === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                            }`}
                        >
                            ← Sebelumnya
                        </button>

                        <div className="flex space-x-2">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentQuestion(index)}
                                    className={`w-10 h-10 rounded-full font-medium transition-colors ${
                                        currentQuestion === index
                                            ? 'bg-green-500 text-white'
                                            : answers[questions[index]?.id]
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        {currentQuestion < totalQuestions - 1 ? (
                            <button
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
                            >
                                Selanjutnya →
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Mengirim...' : '📤 Kirim Jawaban'}
                            </button>
                        )}
                    </div>

                    {/* Answered Count */}
                    <div className="mt-6 text-center text-gray-500">
                        {Object.keys(answers).length} dari {totalQuestions} soal dijawab
                    </div>
                </div>
            </div>
        </>
    );
}

import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ auth, module }) {
    const [activeTab, setActiveTab] = useState('materi');

    // Function to render content with simple formatting
    const renderContent = (content) => {
        if (!content) return null;
        
        return content.split('\n').map((line, index) => {
            // Headers
            if (line.startsWith('## ')) {
                return <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3">{line.replace('## ', '')}</h3>;
            }
            if (line.startsWith('# ')) {
                return <h2 key={index} className="text-2xl font-bold text-gray-800 mt-6 mb-3">{line.replace('# ', '')}</h2>;
            }
            // Numbered list
            if (/^\d+\.\s/.test(line)) {
                return <p key={index} className="ml-4 mb-2 text-gray-700">{line}</p>;
            }
            // Bullet list
            if (line.startsWith('- ') || line.startsWith('• ')) {
                return <p key={index} className="ml-4 mb-2 text-gray-700">• {line.replace(/^[-•]\s/, '')}</p>;
            }
            // Empty line
            if (line.trim() === '') {
                return <br key={index} />;
            }
            // Normal paragraph
            return <p key={index} className="mb-2 text-gray-700 leading-relaxed">{line}</p>;
        });
    };

    return (
        <>
            <Head title={`${module.title} - AgroWaste Academy`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href={route('dashboard')} className="flex items-center">
                                    <span className="text-2xl mr-2">🌾</span>
                                    <span className="text-xl font-bold text-green-600">AgroWaste Academy</span>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href={route('dashboard')} className="text-gray-600 hover:text-green-600">
                                    ← Kembali ke Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Module Header */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                {module.thumbnail ? (
                                    <img src={`/storage/${module.thumbnail}`} alt={module.title} className="w-full h-64 md:h-full object-cover" />
                                ) : (
                                    <div className="w-full h-64 md:h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                        <span className="text-8xl">📚</span>
                                    </div>
                                )}
                            </div>
                            <div className="md:w-2/3 p-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">{module.title}</h1>
                                <p className="text-gray-600 mb-6">{module.description}</p>
                                
                                <div className="flex items-center space-x-6 text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">🎥</span>
                                        <span>{module.videos?.length || 0} Video</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">📝</span>
                                        <span>{module.quizzes?.length || 0} Kuis</span>
                                    </div>
                                </div>

                                {module.document && (
                                    <a 
                                        href={`/storage/${module.document}`} 
                                        target="_blank"
                                        className="inline-flex items-center mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                                    >
                                        📄 Download Materi PDF
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm mb-6">
                        <button
                            onClick={() => setActiveTab('materi')}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                                activeTab === 'materi' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            📖 Materi Pembelajaran
                        </button>
                        <button
                            onClick={() => setActiveTab('video')}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                                activeTab === 'video' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            🎥 Video ({module.videos?.length || 0})
                        </button>
                        <button
                            onClick={() => setActiveTab('kuis')}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                                activeTab === 'kuis' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            📝 Kuis ({module.quizzes?.length || 0})
                        </button>
                    </div>

                    {/* Materi Tab */}
                    {activeTab === 'materi' && (
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="mr-3">📖</span> Materi Pembelajaran
                            </h2>
                            
                            {module.content ? (
                                <div className="prose max-w-none">
                                    {renderContent(module.content)}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-xl p-8 text-center">
                                    <span className="text-5xl block mb-4">📚</span>
                                    <p className="text-gray-500 mb-4">Materi pembelajaran belum tersedia.</p>
                                    <p className="text-gray-400 text-sm">Silakan tonton video atau kerjakan kuis yang tersedia.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Videos Tab */}
                    {activeTab === 'video' && (
                        <div>
                            {module.videos && module.videos.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {module.videos.map((video, index) => (
                                        <Link
                                            key={video.id}
                                            href={route('learning.videos.show', video.id)}
                                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="relative">
                                                <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                                    <span className="text-5xl">▶️</span>
                                                </div>
                                                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                                    Video {index + 1}
                                                </span>
                                                {video.duration && (
                                                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                        {video.duration} menit
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-800">{video.title}</h3>
                                                <p className="text-gray-500 text-sm line-clamp-2 mt-1">{video.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl p-12 text-center">
                                    <span className="text-5xl block mb-4">🎥</span>
                                    <p className="text-gray-500">Belum ada video dalam modul ini.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quizzes Tab */}
                    {activeTab === 'kuis' && (
                        <div>
                            {module.quizzes && module.quizzes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {module.quizzes.map((quiz) => (
                                        <Link
                                            key={quiz.id}
                                            href={route('learning.quizzes.show', quiz.id)}
                                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                                <span className="text-5xl">📝</span>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
                                                <p className="text-gray-500 text-sm line-clamp-2 mt-1">{quiz.description}</p>
                                                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                                                    {quiz.duration && <span>⏱ {quiz.duration} menit</span>}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl p-12 text-center">
                                    <span className="text-5xl block mb-4">📝</span>
                                    <p className="text-gray-500">Belum ada kuis dalam modul ini.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

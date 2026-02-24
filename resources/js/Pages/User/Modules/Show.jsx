import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, module }) {
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

                    {/* Videos Section */}
                    {module.videos && module.videos.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎥 Video dalam Modul Ini</h2>
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
                        </div>
                    )}

                    {/* Quizzes Section */}
                    {module.quizzes && module.quizzes.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Kuis dalam Modul Ini</h2>
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
                        </div>
                    )}

                    {/* Empty State */}
                    {(!module.videos || module.videos.length === 0) && (!module.quizzes || module.quizzes.length === 0) && (
                        <div className="text-center py-12 bg-white rounded-xl">
                            <span className="text-5xl block mb-4">📭</span>
                            <p className="text-gray-500">Belum ada konten dalam modul ini.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

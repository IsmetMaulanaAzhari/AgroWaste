import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, modules, videos, quizzes, stats }) {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', name: 'Beranda', icon: '🏠' },
        { id: 'modules', name: 'Modul', icon: '📚' },
        { id: 'videos', name: 'Video', icon: '🎥' },
        { id: 'quizzes', name: 'Kuis', icon: '📝' },
    ];

    return (
        <>
            <Head title="Dashboard - AgroWaste Academy" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center">
                                    <span className="text-2xl mr-2">🌾</span>
                                    <span className="text-xl font-bold text-green-600">AgroWaste Academy</span>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-600">Halo, {auth.user.name}</span>
                                <Link
                                    href={route('profile.edit')}
                                    className="text-gray-600 hover:text-green-600 transition-colors"
                                >
                                    Profil
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                                >
                                    Keluar
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Tab Navigation */}
                    <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-green-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Welcome Banner */}
                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
                                <h1 className="text-3xl font-bold mb-2">Selamat Datang, {auth.user.name}! 👋</h1>
                                <p className="text-green-100">Lanjutkan perjalanan belajar Anda untuk mengubah limbah menjadi peluang.</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">📚</div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-800">{stats.totalModules}</div>
                                            <div className="text-gray-500">Modul Tersedia</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">🎥</div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-800">{stats.totalVideos}</div>
                                            <div className="text-gray-500">Video Tutorial</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">📝</div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-800">{stats.totalQuizzes}</div>
                                            <div className="text-gray-500">Kuis Interaktif</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Modules */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">Modul Terbaru</h2>
                                    <button onClick={() => setActiveTab('modules')} className="text-green-600 hover:text-green-700 font-medium">
                                        Lihat Semua →
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {modules.slice(0, 3).map((module) => (
                                        <Link
                                            key={module.id}
                                            href={route('learning.modules.show', module.id)}
                                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            {module.thumbnail ? (
                                                <img src={`/storage/${module.thumbnail}`} alt={module.title} className="w-full h-40 object-cover" />
                                            ) : (
                                                <div className="w-full h-40 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                                    <span className="text-5xl">📚</span>
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-800 mb-2">{module.title}</h3>
                                                <p className="text-gray-500 text-sm line-clamp-2">{module.description}</p>
                                                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                                                    <span>🎥 {module.videos_count} Video</span>
                                                    <span>📝 {module.quizzes_count} Kuis</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modules Tab */}
                    {activeTab === 'modules' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Semua Modul Pembelajaran</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {modules.map((module) => (
                                    <Link
                                        key={module.id}
                                        href={route('learning.modules.show', module.id)}
                                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        {module.thumbnail ? (
                                            <img src={`/storage/${module.thumbnail}`} alt={module.title} className="w-full h-40 object-cover" />
                                        ) : (
                                            <div className="w-full h-40 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                                <span className="text-5xl">📚</span>
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 mb-2">{module.title}</h3>
                                            <p className="text-gray-500 text-sm line-clamp-2">{module.description}</p>
                                            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                                                <span>🎥 {module.videos_count} Video</span>
                                                <span>📝 {module.quizzes_count} Kuis</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {modules.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <span className="text-5xl block mb-4">📚</span>
                                    Belum ada modul tersedia.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Videos Tab */}
                    {activeTab === 'videos' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Semua Video Tutorial</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {videos.map((video) => (
                                    <Link
                                        key={video.id}
                                        href={route('learning.videos.show', video.id)}
                                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="relative">
                                            <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                                <span className="text-5xl">🎥</span>
                                            </div>
                                            {video.duration && (
                                                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                    {video.duration} menit
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
                                            <p className="text-gray-500 text-sm line-clamp-2">{video.description}</p>
                                            {video.learning_module && (
                                                <div className="mt-3 text-sm text-green-600">
                                                    📚 {video.learning_module.title}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {videos.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <span className="text-5xl block mb-4">🎥</span>
                                    Belum ada video tersedia.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Quizzes Tab */}
                    {activeTab === 'quizzes' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Semua Kuis</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {quizzes.map((quiz) => (
                                    <Link
                                        key={quiz.id}
                                        href={route('learning.quizzes.show', quiz.id)}
                                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                            <span className="text-5xl">📝</span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 mb-2">{quiz.title}</h3>
                                            <p className="text-gray-500 text-sm line-clamp-2">{quiz.description}</p>
                                            <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                                                <span>❓ {quiz.questions_count} Soal</span>
                                                {quiz.duration && <span>⏱ {quiz.duration} menit</span>}
                                            </div>
                                            {quiz.learning_module && (
                                                <div className="mt-2 text-sm text-green-600">
                                                    📚 {quiz.learning_module.title}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {quizzes.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <span className="text-5xl block mb-4">📝</span>
                                    Belum ada kuis tersedia.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

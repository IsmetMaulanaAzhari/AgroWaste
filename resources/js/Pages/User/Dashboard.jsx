import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    HomeIcon,
    BookOpenIcon,
    VideoCameraIcon,
    ClipboardDocumentListIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth, modules, videos, quizzes, stats }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { id: 'overview', name: 'Beranda', icon: HomeIcon },
        { id: 'modules', name: 'Modul', icon: BookOpenIcon },
        { id: 'videos', name: 'Video', icon: VideoCameraIcon },
        { id: 'quizzes', name: 'Kuis', icon: ClipboardDocumentListIcon },
    ];

    return (
        <>
            <Head title="Dashboard - AgroWaste Academy" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
                    </div>
                )}

                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl mr-2">🌾</span>
                                <span className="text-lg font-bold text-green-400">AgroWaste</span>
                            </Link>
                            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="px-4 py-4 border-b border-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">{auth.user.name}</p>
                                    <p className="text-gray-400 text-xs">{auth.user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                            {navigation.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === item.id 
                                            ? 'bg-green-600 text-white' 
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                    {item.id === 'modules' && (
                                        <span className="ml-auto bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{stats.totalModules}</span>
                                    )}
                                    {item.id === 'videos' && (
                                        <span className="ml-auto bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{stats.totalVideos}</span>
                                    )}
                                    {item.id === 'quizzes' && (
                                        <span className="ml-auto bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{stats.totalQuizzes}</span>
                                    )}
                                </button>
                            ))}
                        </nav>

                        {/* Bottom Actions */}
                        <div className="p-4 border-t border-gray-700 space-y-2">
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                            >
                                <UserCircleIcon className="h-5 w-5 mr-3" />
                                Profil Saya
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                                Keluar
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:pl-64">
                    {/* Top Header (Mobile) */}
                    <header className="sticky top-0 z-30 bg-white shadow-sm lg:hidden">
                        <div className="flex items-center justify-between h-16 px-4">
                            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700">
                                <Bars3Icon className="h-6 w-6" />
                            </button>
                            <Link href="/" className="flex items-center">
                                <span className="text-xl mr-2">🌾</span>
                                <span className="font-bold text-green-600">AgroWaste</span>
                            </Link>
                            <div className="w-6"></div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-4 lg:p-8">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Welcome Banner */}
                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 lg:p-8 text-white">
                                    <h1 className="text-2xl lg:text-3xl font-bold mb-2">Selamat Datang, {auth.user.name}! 👋</h1>
                                    <p className="text-green-100">Lanjutkan perjalanan belajar Anda untuk mengubah limbah menjadi peluang.</p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                <BookOpenIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-800">{stats.totalModules}</div>
                                                <div className="text-gray-500 text-sm">Modul Tersedia</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                <VideoCameraIcon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-800">{stats.totalVideos}</div>
                                                <div className="text-gray-500 text-sm">Video Tutorial</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                                <ClipboardDocumentListIcon className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-800">{stats.totalQuizzes}</div>
                                                <div className="text-gray-500 text-sm">Kuis Interaktif</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Modules */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold text-gray-800">Modul Terbaru</h2>
                                        <button onClick={() => setActiveTab('modules')} className="text-green-600 hover:text-green-700 font-medium text-sm">
                                            Lihat Semua →
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {modules.slice(0, 3).map((module) => (
                                            <Link
                                                key={module.id}
                                                href={route('learning.modules.show', module.id)}
                                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                            >
                                                {module.thumbnail ? (
                                                    <img src={`/storage/${module.thumbnail}`} alt={module.title} className="w-full h-36 object-cover" />
                                                ) : (
                                                    <div className="w-full h-36 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                                        <BookOpenIcon className="h-12 w-12 text-white" />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{module.title}</h3>
                                                    <p className="text-gray-500 text-sm line-clamp-2">{module.description}</p>
                                                    <div className="flex items-center space-x-3 mt-3 text-xs text-gray-400">
                                                        <span className="flex items-center"><VideoCameraIcon className="h-3.5 w-3.5 mr-1" /> {module.videos_count} Video</span>
                                                        <span className="flex items-center"><ClipboardDocumentListIcon className="h-3.5 w-3.5 mr-1" /> {module.quizzes_count} Kuis</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Videos */}
                                {videos.length > 0 && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-xl font-bold text-gray-800">Video Terbaru</h2>
                                            <button onClick={() => setActiveTab('videos')} className="text-green-600 hover:text-green-700 font-medium text-sm">
                                                Lihat Semua →
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {videos.slice(0, 3).map((video) => (
                                                <Link
                                                    key={video.id}
                                                    href={route('learning.videos.show', video.id)}
                                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                                >
                                                    <div className="relative">
                                                        <div className="w-full h-36 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                                            <VideoCameraIcon className="h-12 w-12 text-white" />
                                                        </div>
                                                        {video.duration && (
                                                            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                                {video.duration} menit
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{video.title}</h3>
                                                        <p className="text-gray-500 text-sm line-clamp-2">{video.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Modules Tab */}
                        {activeTab === 'modules' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Semua Modul Pembelajaran</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {modules.map((module) => (
                                        <Link
                                            key={module.id}
                                            href={route('learning.modules.show', module.id)}
                                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                        >
                                            {module.thumbnail ? (
                                                <img src={`/storage/${module.thumbnail}`} alt={module.title} className="w-full h-40 object-cover" />
                                            ) : (
                                                <div className="w-full h-40 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                                    <BookOpenIcon className="h-12 w-12 text-white" />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-800 mb-2">{module.title}</h3>
                                                <p className="text-gray-500 text-sm line-clamp-2">{module.description}</p>
                                                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                                                    <span className="flex items-center"><VideoCameraIcon className="h-4 w-4 mr-1" /> {module.videos_count} Video</span>
                                                    <span className="flex items-center"><ClipboardDocumentListIcon className="h-4 w-4 mr-1" /> {module.quizzes_count} Kuis</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {modules.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        <BookOpenIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                                        <p>Belum ada modul tersedia.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Videos Tab */}
                        {activeTab === 'videos' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Semua Video Tutorial</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {videos.map((video) => (
                                        <Link
                                            key={video.id}
                                            href={route('learning.videos.show', video.id)}
                                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                        >
                                            <div className="relative">
                                                <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                                    <VideoCameraIcon className="h-12 w-12 text-white" />
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
                                                    <div className="mt-3 text-sm text-green-600 flex items-center">
                                                        <BookOpenIcon className="h-4 w-4 mr-1" /> {video.learning_module.title}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {videos.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        <VideoCameraIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                                        <p>Belum ada video tersedia.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quizzes Tab */}
                        {activeTab === 'quizzes' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Semua Kuis</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {quizzes.map((quiz) => (
                                        <Link
                                            key={quiz.id}
                                            href={route('learning.quizzes.show', quiz.id)}
                                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                        >
                                            <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                                <ClipboardDocumentListIcon className="h-12 w-12 text-white" />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-800 mb-2">{quiz.title}</h3>
                                                <p className="text-gray-500 text-sm line-clamp-2">{quiz.description}</p>
                                                <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                                                    <span>❓ {quiz.questions_count} Soal</span>
                                                    {quiz.duration && <span>⏱ {quiz.duration} menit</span>}
                                                </div>
                                                {quiz.learning_module && (
                                                    <div className="mt-2 text-sm text-green-600 flex items-center">
                                                        <BookOpenIcon className="h-4 w-4 mr-1" /> {quiz.learning_module.title}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {quizzes.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        <ClipboardDocumentListIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                                        <p>Belum ada kuis tersedia.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}

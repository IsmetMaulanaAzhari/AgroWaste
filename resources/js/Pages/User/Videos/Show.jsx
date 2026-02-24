import { Head, Link } from '@inertiajs/react';

function getYouTubeVideoId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function Show({ auth, video, relatedVideos }) {
    const videoId = getYouTubeVideoId(video.url);

    return (
        <>
            <Head title={`${video.title} - AgroWaste Academy`} />
            
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
                    <div className="lg:flex lg:space-x-8">
                        {/* Main Video Content */}
                        <div className="lg:w-2/3">
                            {/* Video Player */}
                            <div className="bg-black rounded-2xl overflow-hidden mb-6">
                                {videoId ? (
                                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video flex items-center justify-center text-white">
                                        <div className="text-center">
                                            <span className="text-5xl block mb-4">🎥</span>
                                            <p>Video tidak tersedia</p>
                                            {video.url && (
                                                <a href={video.url} target="_blank" className="text-blue-400 hover:underline mt-2 block">
                                                    Buka di tab baru →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Video Info */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">{video.title}</h1>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                    {video.duration && (
                                        <span className="flex items-center space-x-1">
                                            <span>⏱</span>
                                            <span>{video.duration} menit</span>
                                        </span>
                                    )}
                                    {video.learning_module && (
                                        <Link 
                                            href={route('learning.modules.show', video.learning_module.id)}
                                            className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                                        >
                                            <span>📚</span>
                                            <span>{video.learning_module.title}</span>
                                        </Link>
                                    )}
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Deskripsi</h3>
                                    <p className="text-gray-600 whitespace-pre-line">{video.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Related Videos */}
                        <div className="lg:w-1/3 mt-8 lg:mt-0">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Video Terkait</h2>
                            <div className="space-y-4">
                                {relatedVideos && relatedVideos.map((relatedVideo) => (
                                    <Link
                                        key={relatedVideo.id}
                                        href={route('learning.videos.show', relatedVideo.id)}
                                        className="flex bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="w-32 h-20 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl">▶️</span>
                                        </div>
                                        <div className="p-3 flex-1">
                                            <h3 className="font-medium text-gray-800 text-sm line-clamp-2">{relatedVideo.title}</h3>
                                            {relatedVideo.duration && (
                                                <span className="text-xs text-gray-500 mt-1">⏱ {relatedVideo.duration} menit</span>
                                            )}
                                        </div>
                                    </Link>
                                ))}

                                {(!relatedVideos || relatedVideos.length === 0) && (
                                    <div className="text-center py-8 text-gray-500">
                                        <span className="block mb-2">🎥</span>
                                        Tidak ada video terkait
                                    </div>
                                )}
                            </div>

                            {/* Back to Module */}
                            {video.learning_module && (
                                <Link
                                    href={route('learning.modules.show', video.learning_module.id)}
                                    className="mt-6 block w-full text-center py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                                >
                                    📚 Lihat Semua Video dalam Modul
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

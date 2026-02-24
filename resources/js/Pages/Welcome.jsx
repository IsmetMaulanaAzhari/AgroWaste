import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, stats }) {
    return (
        <>
            <Head title="AgroWaste Academy - Platform Edukasi Pengelolaan Limbah Pertanian" />
            
            <div className="min-h-screen">
                {/* Header */}
                <header className="absolute top-0 left-0 right-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <span className="text-2xl mr-2">🌾</span>
                                <span className="text-xl font-bold text-white">AgroWaste Academy</span>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-4 py-2 text-white hover:text-green-200 font-medium transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-white hover:text-green-200 font-medium transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-5 py-2 bg-white text-green-600 hover:bg-green-50 rounded-full font-medium transition-colors"
                                        >
                                            Daftar Gratis
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 30%, #86efac 60%, #f97316 100%)'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 via-green-500/80 to-orange-500/70"></div>
                    
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Platform Edukasi<br />
                            Pengelolaan Limbah Pertanian
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Ubah limbah pertanian Anda menjadi produk bernilai ekonomis tinggi. Belajar dari para ahli dengan metode praktis dan mudah dipahami.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link
                                href={auth?.user ? route('dashboard') : route('register')}
                                className="px-8 py-3 bg-white text-green-600 hover:bg-green-50 rounded-full font-semibold text-lg transition-colors shadow-lg"
                            >
                                Mulai Belajar Gratis
                            </Link>
                            <a
                                href="#features"
                                className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-semibold text-lg transition-colors"
                            >
                                Pelajari Lebih Lanjut
                            </a>
                        </div>

                        {/* Stats Cards */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 text-center min-w-[160px]">
                                <div className="text-3xl mb-2">📚</div>
                                <div className="text-3xl font-bold text-white">{stats?.modules || 15}+</div>
                                <div className="text-white/80 text-sm">Modul Pembelajaran</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 text-center min-w-[160px]">
                                <div className="text-3xl mb-2">👨‍🌾</div>
                                <div className="text-3xl font-bold text-white">{stats?.users || 500}+</div>
                                <div className="text-white/80 text-sm">Petani Bergabung</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 text-center min-w-[160px]">
                                <div className="text-3xl mb-2">⭐</div>
                                <div className="text-3xl font-bold text-white">98%</div>
                                <div className="text-white/80 text-sm">Kepuasan Pengguna</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-green-600">{stats?.modules || 3}+</div>
                                <div className="text-gray-600 mt-2">Modul Tersedia</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-green-600">{stats?.videos || 9}+</div>
                                <div className="text-gray-600 mt-2">Video Tutorial</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-green-600">{stats?.users || 100}+</div>
                                <div className="text-gray-600 mt-2">Petani Bergabung</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-green-600">95%</div>
                                <div className="text-gray-600 mt-2">Kepuasan Pengguna</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                Mengapa Memilih AgroWaste Academy?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Platform pembelajaran lengkap untuk mengubah limbah pertanian menjadi peluang bisnis
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                                    📚
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Modul Lengkap</h3>
                                <p className="text-gray-600">
                                    Materi pembelajaran terstruktur dari dasar hingga mahir dengan panduan langkah demi langkah.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                                    🎥
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Video Tutorial</h3>
                                <p className="text-gray-600">
                                    Tutorial video praktis yang mudah diikuti untuk setiap teknik pengolahan limbah.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                                    📝
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Kuis Interaktif</h3>
                                <p className="text-gray-600">
                                    Uji pemahaman Anda dengan kuis interaktif dan dapatkan sertifikat kelulusan.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-green-600 to-green-500">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Siap Memulai Perjalanan Belajar Anda?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan petani Indonesia yang telah berhasil mengubah limbah menjadi peluang ekonomi.
                        </p>
                        <Link
                            href={auth?.user ? route('dashboard') : route('register')}
                            className="inline-block px-10 py-4 bg-white text-green-600 hover:bg-green-50 rounded-full font-semibold text-lg transition-colors shadow-lg"
                        >
                            Daftar Sekarang - Gratis!
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-2">🌾</span>
                                    <span className="text-xl font-bold">AgroWaste Academy</span>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Platform edukasi terdepan untuk pengelolaan limbah pertanian di Indonesia.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Menu</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
                                    <li><a href="#features" className="hover:text-white transition-colors">Fitur</a></li>
                                    <li><Link href={route('login')} className="hover:text-white transition-colors">Masuk</Link></li>
                                    <li><Link href={route('register')} className="hover:text-white transition-colors">Daftar</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Kontak</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>📧 info@agrowaste.id</li>
                                    <li>📱 +62 812 3456 7890</li>
                                    <li>📍 Jakarta, Indonesia</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2026 AgroWaste Academy. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

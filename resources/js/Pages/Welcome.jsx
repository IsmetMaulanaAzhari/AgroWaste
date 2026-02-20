import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const [activeMenu, setActiveMenu] = useState('Home');
    
    const menuItems = [
        { name: 'Home', icon: '🏠' },
        { name: 'Modul', icon: '📚' },
        { name: 'Video', icon: '🎥' },
        { name: 'Quiz', icon: '📝' }
    ];

    return (
        <>
            <Head title="Dashboard User" />
            <div className="min-h-screen bg-gray-100 flex">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-lg flex flex-col">
                    <div className="p-6 flex-1">
                        <h2 className="text-xl font-bold text-gray-800 mb-8">Navbar</h2>
                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => setActiveMenu(item.name)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        activeMenu === item.name 
                                            ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                                            : 'text-gray-600 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    {/* Admin Login Button */}
                    <div className="p-6 border-t">
                        <Link
                            href="/admin/login"
                            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            🔐 Admin Login
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard User</h1>
                        <h2 className="text-2xl text-gray-600">{activeMenu}</h2>
                        <p className="text-gray-500 mt-2">website ini dibuat untuk membantu edukasi</p>
                    </div>

                    {/* Content Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                        {/* Produk Card */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="h-48 bg-gray-200 relative">
                                {/* Placeholder X pattern */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400" viewBox="0 0 100 100">
                                        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="3"/>
                                        <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="3"/>
                                    </svg>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-600 mt-20">Produk</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg border-2 border-gray-300 transition-colors font-medium">
                                    Buka halaman
                                </button>
                            </div>
                        </div>

                        {/* Limbah Card */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="h-48 bg-gray-200 relative">
                                {/* Placeholder X pattern */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-400" viewBox="0 0 100 100">
                                        <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="3"/>
                                        <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="3"/>
                                    </svg>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-600 mt-20">Limbah</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg border-2 border-gray-300 transition-colors font-medium">
                                    Buka halaman
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

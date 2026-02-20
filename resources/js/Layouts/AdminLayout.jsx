import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminLayout({ children, title = 'Admin Panel' }) {
    const [sidebarOpen, setSidebarOpen] = useState(true); // Set default to true
    const { post } = useForm();

    const logout = () => {
        post(route('admin.logout'));
    };

    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: '📊' },
        { name: 'Learning', href: route('admin.learning.index'), icon: '📚' },
        { name: 'Modules', href: route('admin.learning.modules.index'), icon: '📖' },
        { name: 'Videos', href: route('admin.learning.videos.index'), icon: '🎬' },
        { name: 'Quizzes', href: route('admin.learning.quizzes.index'), icon: '📝' },
    ];

    return (
        <>
            <Head title={title} />
            
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar for mobile */}
                <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300`}>
                    <div className="flex items-center h-16 bg-blue-600 px-4">
                        <h1 className="text-xl font-bold text-white flex-1">AgroWaste Admin</h1>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-white focus:outline-none"
                        >
                            <span className="text-2xl">☰</span>
                        </button>
                    </div>
                    <nav className="flex flex-col h-full">
                        <div className="flex-1 px-4 mt-6">
                            <div className="space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                    >
                                        <span className="mr-3 text-lg">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="px-4 py-4 border-t border-gray-200">
                            <span className="block text-sm text-gray-500 mb-2">Admin</span>
                            <button
                                onClick={logout}
                                className="w-full text-left text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Sidebar for desktop */}
                <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-white shadow-lg transform transition-all duration-300 ${sidebarOpen ? 'lg:w-64' : 'lg:w-16'}`}>
                    <div className="flex items-center h-16 bg-blue-600 px-4">
                        <h1 className={`text-xl font-bold text-white transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>AgroWaste Admin</h1>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-white focus:outline-none ml-auto"
                        >
                            <span className="text-2xl">{sidebarOpen ? '☰' : '☰'}</span>
                        </button>
                    </div>
                    <nav className="flex flex-col h-full">
                        <div className="flex-1 px-4 mt-6">
                            <div className="space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                        title={item.name}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className={`ml-3 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className={`px-4 py-4 border-t border-gray-200 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                            <span className="block text-sm text-gray-500 mb-2">Admin</span>
                            <button
                                onClick={logout}
                                className="w-full text-left text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Main content */}
                <div className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} transition-[margin] duration-300`}>
                    {/* Mobile header */}
                    <div className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
                        <div className="px-4 sm:px-6">
                            <div className="flex justify-between items-center py-4">
                                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="text-gray-500 focus:outline-none"
                                >
                                    <span className="text-2xl">☰</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Page content */}
                    <main>
                        <div className="py-6">
                            <div className="px-4 sm:px-6 lg:px-8">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
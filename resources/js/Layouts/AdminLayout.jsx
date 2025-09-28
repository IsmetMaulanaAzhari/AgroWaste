import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminLayout({ children, title = 'Admin Panel' }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { post } = useForm();

    const logout = () => {
        post(route('admin.logout'));
    };

    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: '📊' },
        { name: 'Products', href: route('admin.products.index'), icon: '🛍️' },
        { name: 'Wastes', href: route('admin.wastes.index'), icon: '♻️' },
    ];

    return (
        <>
            <Head title={title} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform lg:translate-x-0 lg:static lg:inset-0">
                    <div className="flex items-center justify-center h-16 bg-blue-600">
                        <h1 className="text-xl font-bold text-white">AgroWaste Admin</h1>
                    </div>
                    <nav className="mt-6 px-4">
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
                    </nav>
                </div>

                {/* Main content */}
                <div className="lg:pl-64 flex flex-col flex-1">
                    {/* Top bar */}
                    <div className="bg-white shadow-sm border-b border-gray-200">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center py-4">
                                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                                
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">Admin</span>
                                    <button
                                        onClick={logout}
                                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page content */}
                    <main className="flex-1">
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
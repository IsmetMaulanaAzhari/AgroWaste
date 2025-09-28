import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard({ stats }) {
    return (
        <AdminLayout title="Dashboard">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">🛍️</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Products
                                        </dt>
                                        <dd className="text-2xl font-bold text-gray-900">
                                            {stats.total_products}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">✅</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Active Products
                                        </dt>
                                        <dd className="text-2xl font-bold text-gray-900">
                                            {stats.active_products}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">♻️</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Wastes
                                        </dt>
                                        <dd className="text-2xl font-bold text-gray-900">
                                            {stats.total_wastes}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="text-2xl">🔄</div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Recyclable Wastes
                                        </dt>
                                        <dd className="text-2xl font-bold text-gray-900">
                                            {stats.recyclable_wastes}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <a
                                href={route('admin.products.create')}
                                className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <div className="text-2xl mr-3">➕</div>
                                <div>
                                    <div className="font-medium text-blue-900">Add New Product</div>
                                    <div className="text-sm text-blue-700">Create a new product entry</div>
                                </div>
                            </a>

                            <a
                                href={route('admin.wastes.create')}
                                className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                            >
                                <div className="text-2xl mr-3">🗂️</div>
                                <div>
                                    <div className="font-medium text-green-900">Add New Waste Info</div>
                                    <div className="text-sm text-green-700">Create waste recycling info</div>
                                </div>
                            </a>

                            <a
                                href={route('admin.products.index')}
                                className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                            >
                                <div className="text-2xl mr-3">📋</div>
                                <div>
                                    <div className="font-medium text-purple-900">Manage Products</div>
                                    <div className="text-sm text-purple-700">View and edit products</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
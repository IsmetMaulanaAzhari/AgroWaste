import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

export default function ProductIndex({ products }) {
    const deleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    return (
        <AdminLayout title="Products Management">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <Link
                        href={route('admin.products.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Add New Product
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.data.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {product.image ? (
                                                    <img
                                                        className="h-10 w-10 rounded-lg object-cover"
                                                        src={`/storage/${product.image}`}
                                                        alt={product.name}
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <span className="text-gray-500 text-xs">No img</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {product.description.substring(0, 50)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            product.category === 'organic' ? 'bg-green-100 text-green-800' :
                                            product.category === 'recycled' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.price ? `Rp ${Number(product.price).toLocaleString()}` : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={route('admin.products.show', product.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={route('admin.products.edit', product.id)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Pagination */}
                    {products.links && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {products.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                            link.active 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
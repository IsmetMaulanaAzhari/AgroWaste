import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductIndex({ products }) {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [createPreview, setCreatePreview] = useState(null);
    const [editPreview, setEditPreview] = useState(null);

    const handleImagePreview = (e, setPreview) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const deleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        router.post(route('admin.products.store'), formData, {
            onSuccess: () => {
                setCreateModalOpen(false);
                setCreatePreview(null);
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('_method', 'PATCH');
        
        // If no new image is selected, remove the empty file input from formData
        if (!e.target.image.files[0]) {
            formData.delete('image');
        }

        router.post(route('admin.products.update', editProduct.id), formData, {
            onSuccess: () => {
                setEditModalOpen(false);
                setEditProduct(null);
                setEditPreview(null);
            },
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Products Management">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Add New Product
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {products && products.data && products.data.length > 0 ? (
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
                                                            className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                                                            src={`/storage/${product.image}`}
                                                            alt={product.name}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='12'%3ENo img%3C/text%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-500 text-xs">No img</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {product.description?.substring(0, 50)}...
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
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => {
                                                    const formData = new FormData();
                                                    formData.append('_method', 'PATCH');
                                                    formData.append('name', product.name);
                                                    formData.append('description', product.description);
                                                    formData.append('category', product.category);
                                                    formData.append('is_active', product.is_active ? '0' : '1');
                                                    router.post(route('admin.products.update', product.id), formData, {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                    });
                                                }}
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                                    product.is_active ? 'bg-green-500' : 'bg-gray-200'
                                                }`}
                                            >
                                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                                    product.is_active ? 'translate-x-5' : 'translate-x-0'
                                                }`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setEditProduct(product);
                                                        setEditModalOpen(true);
                                                    }}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    Edit
                                                </button>
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
                    ) : (
                        <div className="p-4 text-center text-gray-500">No products available.</div>
                    )}
                </div>

                {/* Create Modal */}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform scale-95 animate-fade-in">
                            <h2 className="text-lg font-bold mb-4 text-center text-blue-600">Add New Product</h2>
                            <form onSubmit={handleCreate} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" name="name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea name="description" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <div className="mt-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                const input = document.querySelector('input[name="is_active"]');
                                                input.value = input.value === "1" ? "0" : "1";
                                                e.target.classList.toggle('bg-green-500');
                                                e.target.classList.toggle('bg-gray-200');
                                                e.target.querySelector('span').classList.toggle('translate-x-5');
                                            }}
                                            className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200"
                                        >
                                            <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
                                        </button>
                                        <input type="hidden" name="is_active" value="0" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select name="category" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
                                        <option value="organic">Organic</option>
                                        <option value="recycled">Recycled</option>
                                        <option value="composted">Composted</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Image</label>
                                    {createPreview && (
                                        <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden">
                                            <img
                                                src={createPreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCreatePreview(null);
                                                    const input = document.querySelector('input[name="image"]');
                                                    if (input) input.value = '';
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        name="image" 
                                        accept="image/*"
                                        onChange={(e) => handleImagePreview(e, setCreatePreview)}
                                        className="mt-2 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCreateModalOpen(false);
                                            setCreatePreview(null);
                                        }}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {isEditModalOpen && editProduct && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[480px] transform transition-transform scale-95 animate-fade-in overflow-y-auto max-h-[90vh]">
                            <h2 className="text-lg font-bold mb-4 text-center text-blue-600">Edit Product</h2>
                            <form onSubmit={handleUpdate} encType="multipart/form-data">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={editProduct.name}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        defaultValue={editProduct.description}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <div className="mt-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                const input = e.target.nextElementSibling;
                                                input.value = input.value === "1" ? "0" : "1";
                                                e.target.classList.toggle('bg-green-500');
                                                e.target.classList.toggle('bg-gray-200');
                                                e.target.querySelector('span').classList.toggle('translate-x-5');
                                            }}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                                editProduct.is_active ? 'bg-green-500' : 'bg-gray-200'
                                            }`}
                                        >
                                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                                editProduct.is_active ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                        </button>
                                        <input type="hidden" name="is_active" defaultValue={editProduct.is_active ? "1" : "0"} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        name="category"
                                        defaultValue={editProduct.category}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="organic">Organic</option>
                                        <option value="recycled">Recycled</option>
                                        <option value="composted">Composted</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Image</label>
                                    {editProduct.image && !editPreview && (
                                        <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden">
                                            <img
                                                src={`/storage/${editProduct.image}`}
                                                alt="Current image"
                                                className="w-full h-full object-contain bg-gray-100"
                                            />
                                        </div>
                                    )}
                                    {editPreview && (
                                        <div className="mt-2 relative w-full h-48 rounded-lg overflow-hidden">
                                            <img
                                                src={editPreview}
                                                alt="Preview"
                                                className="w-full h-full object-contain bg-gray-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditPreview(null);
                                                    const input = document.querySelector('form[onSubmit="handleUpdate"] input[name="image"]');
                                                    if (input) input.value = '';
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        name="image" 
                                        accept="image/*" 
                                        onChange={(e) => handleImagePreview(e, setEditPreview)}
                                        className="mt-2 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Leave empty to keep current image
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditModalOpen(false);
                                            setEditProduct(null);
                                            setEditPreview(null);
                                        }}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function ProductCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image: null,
        price: '',
        stock: '',
        category: 'organic',
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AdminLayout title="Add New Product">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>

                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.description && <div className="mt-1 text-sm text-red-600">{errors.description}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files[0])}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.image && <div className="mt-1 text-sm text-red-600">{errors.image}</div>}
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price (Optional)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.price && <div className="mt-1 text-sm text-red-600">{errors.price}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) => setData('stock', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.stock && <div className="mt-1 text-sm text-red-600">{errors.stock}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="organic">Organic</option>
                                <option value="recycled">Recycled</option>
                                <option value="composted">Composted</option>
                            </select>
                            {errors.category && <div className="mt-1 text-sm text-red-600">{errors.category}</div>}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                Active
                            </label>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <a
                                href={route('admin.products.index')}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
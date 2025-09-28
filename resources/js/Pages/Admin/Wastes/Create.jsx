import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function WasteCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image: null,
        type: 'organic',
        recycling_process: '',
        benefits: '',
        is_recyclable: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.wastes.store'));
    };

    return (
        <AdminLayout title="Add New Waste Information">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Waste Information</h1>

                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
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
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
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
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                            {errors.image && <div className="mt-1 text-sm text-red-600">{errors.image}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            >
                                <option value="organic">Organic</option>
                                <option value="plastic">Plastic</option>
                                <option value="paper">Paper</option>
                                <option value="metal">Metal</option>
                                <option value="glass">Glass</option>
                            </select>
                            {errors.type && <div className="mt-1 text-sm text-red-600">{errors.type}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Recycling Process (Optional)</label>
                            <textarea
                                value={data.recycling_process}
                                onChange={(e) => setData('recycling_process', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />
                            {errors.recycling_process && <div className="mt-1 text-sm text-red-600">{errors.recycling_process}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Benefits (Optional)</label>
                            <textarea
                                value={data.benefits}
                                onChange={(e) => setData('benefits', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />
                            {errors.benefits && <div className="mt-1 text-sm text-red-600">{errors.benefits}</div>}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="is_recyclable"
                                type="checkbox"
                                checked={data.is_recyclable}
                                onChange={(e) => setData('is_recyclable', e.target.checked)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_recyclable" className="ml-2 block text-sm text-gray-900">
                                Recyclable
                            </label>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <a
                                href={route('admin.wastes.index')}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Cancel
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Waste Info'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { PlusIcon, PencilIcon, TrashIcon, VideoCameraIcon, DocumentTextIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/Components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Switch } from "@/Components/ui/switch";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

function ModuleForm({ module = null, onSuccess }) {
    const { data, setData, post, put, processing, errors, reset, progress } = useForm({
        title: module?.title || "",
        description: module?.description || "",
        thumbnail: null,
        document: null,
        order: module?.order || 0,
        is_active: module?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (module) {
            post(route("admin.learning.modules.update", module.id), {
                _method: 'put',
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        } else {
            post(route("admin.learning.modules.store"), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <h2 className="text-lg font-semibold">{module ? "Edit Modul" : "Tambah Modul"}</h2>
            
            <div>
                <Label htmlFor="title">Judul Modul</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={e => setData("title", e.target.value)}
                />
                <InputError message={errors.title} />
            </div>

            <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={e => setData("description", e.target.value)}
                    rows={4}
                />
                <InputError message={errors.description} />
            </div>

            <div>
                <Label htmlFor="thumbnail">Gambar Thumbnail</Label>
                <Input
                    id="thumbnail"
                    type="file"
                    onChange={e => setData("thumbnail", e.target.files[0])}
                    accept="image/*"
                />
                <InputError message={errors.thumbnail} />
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
            </div>

            <div>
                <Label htmlFor="document">Dokumen PDF (Opsional)</Label>
                <Input
                    id="document"
                    type="file"
                    onChange={e => setData("document", e.target.files[0])}
                    accept=".pdf"
                />
                <InputError message={errors.document} />
            </div>

            <div>
                <Label htmlFor="order">Urutan</Label>
                <Input
                    id="order"
                    type="number"
                    min="0"
                    value={data.order}
                    onChange={e => setData("order", e.target.value)}
                />
                <InputError message={errors.order} />
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData("is_active", checked)}
                />
                <Label htmlFor="is_active">Aktif</Label>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onSuccess}>
                    Batal
                </Button>
                <Button type="submit" disabled={processing}>
                    {module ? "Simpan Perubahan" : "Tambah Modul"}
                </Button>
            </div>
        </form>
    );
}

export default function Index({ modules }) {
    const [open, setOpen] = useState(false);
    const [editModule, setEditModule] = useState(null);
    
    const handleDelete = (moduleId) => {
        if (confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
            router.delete(route("admin.learning.modules.destroy", moduleId));
        }
    };

    const handleEdit = (module) => {
        setEditModule(module);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditModule(null);
    };

    return (
        <>
            <Head title="Daftar Modul Pembelajaran" />

            <AdminLayout>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Modul Pembelajaran
                        </h1>
                        
                        <Button onClick={() => setOpen(true)}>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Tambah Modul
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules?.data?.map((module) => (
                            <Card key={module.id} className="overflow-hidden">
                                {module.thumbnail ? (
                                    <img 
                                        src={`/storage/${module.thumbnail}`} 
                                        alt={module.title}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                        <BookOpenIcon className="h-16 w-16 text-white" />
                                    </div>
                                )}
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{module.description}</p>
                                    
                                    <div className="mt-4 flex items-center gap-4">
                                        <div className="flex items-center text-gray-600">
                                            <VideoCameraIcon className="h-5 w-5 mr-1" />
                                            <span className="text-sm">{module.videos_count || 0} Video</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <DocumentTextIcon className="h-5 w-5 mr-1" />
                                            <span className="text-sm">{module.quizzes_count || 0} Kuis</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-2">
                                        <span className={`text-xs px-2 py-1 rounded ${module.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {module.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 flex justify-end gap-2 border-t">
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleEdit(module)}
                                    >
                                        <PencilIcon className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => handleDelete(module.id)}
                                    >
                                        <TrashIcon className="h-4 w-4 mr-1" />
                                        Hapus
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <Dialog open={open} onOpenChange={handleClose}>
                        <DialogContent className="max-w-2xl">
                            <DialogClose onClick={handleClose} />
                            <ModuleForm 
                                module={editModule}
                                onSuccess={handleClose} 
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </AdminLayout>
        </>
    );
}

import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

function VideoForm({ moduleId, modules, video = null, onSuccess }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        learning_module_id: video?.learning_module_id || moduleId || "",
        title: video?.title || "",
        description: video?.description || "",
        url: video?.url || "",
        duration: video?.duration || "",
        order: video?.order || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (video) {
            put(route("admin.learning.videos.update", video.id), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        } else {
            post(route("admin.learning.videos.store"), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <h2 className="text-lg font-semibold">{video ? "Edit Video" : "Tambah Video"}</h2>

            <div>
                <Label htmlFor="learning_module_id">Modul</Label>
                <select
                    id="learning_module_id"
                    value={data.learning_module_id}
                    onChange={e => setData("learning_module_id", e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <option value="">Pilih Modul</option>
                    {modules?.map((module) => (
                        <option key={module.id} value={module.id}>{module.title}</option>
                    ))}
                </select>
                <InputError message={errors.learning_module_id} />
            </div>

            <div>
                <Label htmlFor="title">Judul Video</Label>
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
                <Label htmlFor="url">URL YouTube</Label>
                <Input
                    id="url"
                    value={data.url}
                    onChange={e => setData("url", e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                />
                <InputError message={errors.url} />
            </div>

            <div>
                <Label htmlFor="duration">Durasi (menit)</Label>
                <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={data.duration}
                    onChange={e => setData("duration", e.target.value)}
                />
                <InputError message={errors.duration} />
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

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onSuccess}>
                    Batal
                </Button>
                <Button type="submit" disabled={processing}>
                    {video ? "Simpan Perubahan" : "Tambah Video"}
                </Button>
            </div>
        </form>
    );
}

export default function Index({ videos, modules }) {
    const [open, setOpen] = useState(false);
    const [editVideo, setEditVideo] = useState(null);
    
    const handleDelete = (videoId) => {
        if (confirm("Apakah Anda yakin ingin menghapus video ini?")) {
            router.delete(route("admin.learning.videos.destroy", videoId));
        }
    };

    const handleEdit = (video) => {
        setEditVideo(video);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditVideo(null);
    };

    return (
        <>
            <Head title="Daftar Video" />

            <AdminLayout>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Daftar Video
                        </h1>
                        
                        <Button onClick={() => setOpen(true)}>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Tambah Video
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos?.data?.map((video) => (
                            <Card key={video.id} className="overflow-hidden">
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{video.description}</p>
                                    <p className="text-sm text-blue-600 mb-2">
                                        Modul: {video.learning_module?.title || "-"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Durasi: {video.duration || "-"} menit
                                    </p>
                                    
                                    <div className="mt-4 flex justify-end gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleEdit(video)}
                                        >
                                            <PencilIcon className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="destructive" 
                                            size="sm"
                                            onClick={() => handleDelete(video.id)}
                                        >
                                            <TrashIcon className="h-4 w-4 mr-1" />
                                            Hapus
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Dialog open={open} onOpenChange={handleClose}>
                        <DialogContent className="max-w-2xl">
                            <VideoForm 
                                modules={modules}
                                video={editVideo}
                                onSuccess={handleClose} 
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </AdminLayout>
        </>
    );
}

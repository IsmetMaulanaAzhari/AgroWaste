import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import VideoForm from "./VideoForm";

export default function Show({ module, videos }) {
    const [openVideoForm, setOpenVideoForm] = useState(false);
    
    return (
        <>
            <Head title={module.title} />

            <AdminLayout>
                <div className="p-6">
                    <div className="mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                                    {module.title}
                                </h1>
                                <p className="text-gray-600">{module.description}</p>
                            </div>
                            
                            {module.document_url && (
                                <a 
                                    href={module.document_url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                                >
                                    Lihat Dokumen
                                </a>
                            )}
                        </div>

                        <img 
                            src={module.thumbnail_url} 
                            alt={module.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Video</h2>
                            <Button onClick={() => setOpenVideoForm(true)}>
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tambah Video
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {videos.map((video) => (
                                <Card key={video.id}>
                                    <CardContent className="p-4">
                                        <div className="aspect-video mb-4">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video.video_id}`}
                                                className="w-full h-full"
                                                allowFullScreen
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {video.description}
                                        </p>
                                        <div className="mt-4 flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => {}}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" onClick={() => {}}>
                                                Hapus
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <Dialog open={openVideoForm} onOpenChange={setOpenVideoForm}>
                        <DialogContent className="max-w-2xl">
                            <VideoForm 
                                moduleId={module.id}
                                onSuccess={() => setOpenVideoForm(false)} 
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </AdminLayout>
        </>
    );
}
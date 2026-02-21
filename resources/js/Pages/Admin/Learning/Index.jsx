import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { PlusIcon, AcademicCapIcon, VideoCameraIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { router } from "@inertiajs/react";
import ModuleForm from "./ModuleForm";
import VideoForm from "./VideoForm";
import QuizForm from "./QuizForm";

export default function Index({ modules }) {
    const [selectedModule, setSelectedModule] = useState(null);
    const [openModuleForm, setOpenModuleForm] = useState(false);
    const [openVideoForm, setOpenVideoForm] = useState(false);
    const [openQuizForm, setOpenQuizForm] = useState(false);
    
    const handleDelete = (moduleId) => {
        if (confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
            router.delete(route("admin.learning.modules.destroy", moduleId));
        }
    };

    const handleDeleteVideo = (videoId) => {
        if (confirm("Apakah Anda yakin ingin menghapus video ini?")) {
            router.delete(route("admin.learning.videos.destroy", videoId));
        }
    };

    const handleDeleteQuiz = (quizId) => {
        if (confirm("Apakah Anda yakin ingin menghapus kuis ini?")) {
            router.delete(route("admin.learning.quizzes.destroy", quizId));
        }
    };

    return (
        <>
            <Head title="Manajemen Pembelajaran" />

            <AdminLayout>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Manajemen Pembelajaran
                        </h1>
                        
                        <Button onClick={() => setOpenModuleForm(true)}>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Tambah Modul
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.map((module) => (
                            <Card key={module.id} className="overflow-hidden">
                                <img 
                                    src={module.thumbnail_url} 
                                    alt={module.title}
                                    className="w-full h-48 object-cover"
                                />
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{module.description}</p>
                                    
                                    <div className="mt-4 flex items-center gap-4">
                                        <div className="flex items-center text-gray-600">
                                            <VideoCameraIcon className="h-5 w-5 mr-1" />
                                            <span className="text-sm">{module.videos_count} Video</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <DocumentTextIcon className="h-5 w-5 mr-1" />
                                            <span className="text-sm">{module.quizzes_count} Kuis</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 flex justify-between">
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => {
                                                setSelectedModule(module);
                                                setOpenVideoForm(true);
                                            }}
                                        >
                                            <VideoCameraIcon className="h-4 w-4 mr-2" />
                                            Video
                                        </Button>
                                        <Button 
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedModule(module);
                                                setOpenQuizForm(true);
                                            }}
                                        >
                                            <DocumentTextIcon className="h-4 w-4 mr-2" />
                                            Kuis
                                        </Button>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => {
                                                setSelectedModule(module);
                                                setOpenModuleForm(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="destructive" 
                                            onClick={() => handleDelete(module.id)}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </CardFooter>

                                {module.videos?.length > 0 && (
                                    <div className="border-t p-4">
                                        <h4 className="font-semibold mb-2">Video</h4>
                                        <div className="space-y-2">
                                            {module.videos.map((video) => (
                                                <div key={video.id} className="flex justify-between items-center">
                                                    <span>{video.title}</span>
                                                    <div className="flex gap-2">
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline"
                                                            onClick={() => {
                                                                setSelectedVideo(video);
                                                                setOpenVideoForm(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            size="sm" 
                                                            variant="destructive"
                                                            onClick={() => handleDeleteVideo(video.id)}
                                                        >
                                                            Hapus
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {module.quizzes?.length > 0 && (
                                    <div className="border-t p-4">
                                        <h4 className="font-semibold mb-2">Kuis</h4>
                                        <div className="space-y-2">
                                            {module.quizzes.map((quiz) => (
                                                <div key={quiz.id} className="flex justify-between items-center">
                                                    <span>{quiz.title}</span>
                                                    <div className="flex gap-2">
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline"
                                                            onClick={() => {
                                                                setSelectedQuiz(quiz);
                                                                setOpenQuizForm(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            size="sm" 
                                                            variant="destructive"
                                                            onClick={() => handleDeleteQuiz(quiz.id)}
                                                        >
                                                            Hapus
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>

                    {/* Modal Forms */}
                    <Dialog open={openModuleForm} onOpenChange={setOpenModuleForm}>
                        <DialogContent className="max-w-2xl">
                            <ModuleForm 
                                module={selectedModule} 
                                onSuccess={() => {
                                    setOpenModuleForm(false);
                                    setSelectedModule(null);
                                }} 
                            />
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openVideoForm} onOpenChange={setOpenVideoForm}>
                        <DialogContent className="max-w-2xl">
                            <VideoForm 
                                moduleId={selectedModule?.id}
                                onSuccess={() => {
                                    setOpenVideoForm(false);
                                    setSelectedModule(null);
                                }} 
                            />
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openQuizForm} onOpenChange={setOpenQuizForm}>
                        <DialogContent className="max-w-2xl">
                            <QuizForm 
                                moduleId={selectedModule?.id}
                                onSuccess={() => {
                                    setOpenQuizForm(false);
                                    setSelectedModule(null);
                                }} 
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </AdminLayout>
        </>
    );
}
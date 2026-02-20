import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PencilIcon, TrashIcon, PlayCircleIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import ModuleForm from "./ModuleForm";
import { router } from "@inertiajs/react";

export default function ModuleCard({ module }) {
    const [openEdit, setOpenEdit] = useState(false);
    
    const handleDelete = () => {
        if (confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
            router.delete(route("admin.modules.destroy", module.id));
        }
    };

    return (
        <>
            <Card className="overflow-hidden">
                <CardHeader className="p-0">
                    <img 
                        src={module.thumbnail_url} 
                        alt={module.title}
                        className="w-full h-48 object-cover"
                    />
                </CardHeader>
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{module.description}</p>
                    
                    <div className="mt-4 flex items-center gap-4">
                        {module.videos_count > 0 && (
                            <div className="flex items-center text-gray-600">
                                <PlayCircleIcon className="h-5 w-5 mr-1" />
                                <span className="text-sm">{module.videos_count} Video</span>
                            </div>
                        )}
                        {module.quizzes_count > 0 && (
                            <div className="flex items-center text-gray-600">
                                <DocumentTextIcon className="h-5 w-5 mr-1" />
                                <span className="text-sm">{module.quizzes_count} Kuis</span>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex gap-2">
                        <Link href={route("admin.modules.show", module.id)}>
                            <Button variant="outline">Detail</Button>
                        </Link>
                        <Button variant="outline" onClick={() => setOpenEdit(true)}>
                            <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent className="max-w-2xl">
                    <ModuleForm 
                        module={module} 
                        onSuccess={() => setOpenEdit(false)} 
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
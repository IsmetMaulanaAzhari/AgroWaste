import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ModuleCard from "./ModuleCard";
import ModuleForm from "./ModuleForm";
import { Dialog, DialogContent } from "@/Components/ui/dialog";

export default function Index({ modules }) {
    const [open, setOpen] = useState(false);
    
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
                        {modules.map((module) => (
                            <ModuleCard key={module.id} module={module} />
                        ))}
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-w-2xl">
                            <ModuleForm onSuccess={() => setOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>
            </AdminLayout>
        </>
    );
}
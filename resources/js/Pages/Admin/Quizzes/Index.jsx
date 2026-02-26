import { Head, router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/Components/ui/dialog";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

function QuizForm({ moduleId, modules, quiz = null, onSuccess }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        learning_module_id: quiz?.learning_module_id || moduleId || "",
        title: quiz?.title || "",
        description: quiz?.description || "",
        duration: quiz?.duration || "",
        passing_score: quiz?.passing_score || 70,
        order: quiz?.order || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (quiz) {
            put(route("admin.learning.quizzes.update", quiz.id), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        } else {
            post(route("admin.learning.quizzes.store"), {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <h2 className="text-lg font-semibold">{quiz ? "Edit Kuis" : "Tambah Kuis"}</h2>

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
                <Label htmlFor="title">Judul Kuis</Label>
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
                <Label htmlFor="passing_score">Nilai Minimum Lulus (%)</Label>
                <Input
                    id="passing_score"
                    type="number"
                    min="0"
                    max="100"
                    value={data.passing_score}
                    onChange={e => setData("passing_score", e.target.value)}
                />
                <InputError message={errors.passing_score} />
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
                    {quiz ? "Simpan Perubahan" : "Tambah Kuis"}
                </Button>
            </div>
        </form>
    );
}

export default function Index({ quizzes, modules }) {
    const [open, setOpen] = useState(false);
    const [editQuiz, setEditQuiz] = useState(null);
    
    const handleDelete = (quizId) => {
        if (confirm("Apakah Anda yakin ingin menghapus kuis ini?")) {
            router.delete(route("admin.learning.quizzes.destroy", quizId));
        }
    };

    const handleEdit = (quiz) => {
        setEditQuiz(quiz);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditQuiz(null);
    };

    return (
        <>
            <Head title="Daftar Kuis" />

            <AdminLayout>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Daftar Kuis
                        </h1>
                        
                        <Button onClick={() => setOpen(true)}>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Tambah Kuis
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes?.data?.map((quiz) => (
                            <Card key={quiz.id} className="overflow-hidden">
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{quiz.description}</p>
                                    <p className="text-sm text-blue-600 mb-2">
                                        Modul: {quiz.learning_module?.title || "-"}
                                    </p>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p>Durasi: {quiz.duration || "-"} menit</p>
                                        <p>Nilai Minimum: {quiz.passing_score}%</p>
                                        <p>Jumlah Soal: {quiz.questions?.length || 0}</p>
                                    </div>
                                    
                                    <div className="mt-4 flex justify-end gap-2">
                                        <Link href={route("admin.learning.quizzes.show", quiz.id)}>
                                            <Button variant="outline" size="sm">
                                                <EyeIcon className="h-4 w-4 mr-1" />
                                                Soal
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => handleEdit(quiz)}
                                        >
                                            <PencilIcon className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="destructive" 
                                            size="sm"
                                            onClick={() => handleDelete(quiz.id)}
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
                            <DialogClose onClick={handleClose} />
                            <QuizForm 
                                modules={modules}
                                quiz={editQuiz}
                                onSuccess={handleClose} 
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </AdminLayout>
        </>
    );
}

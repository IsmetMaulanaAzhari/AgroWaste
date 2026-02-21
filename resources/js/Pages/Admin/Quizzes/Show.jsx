import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
import { PlusIcon, PencilIcon, TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";

function QuestionForm({ quizId, question = null, onSuccess }) {
    const existingOptions = question?.options || [];
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        question: question?.question || "",
        options: [
            existingOptions[0] || "",
            existingOptions[1] || "",
            existingOptions[2] || "",
            existingOptions[3] || "",
        ],
        correct_answer: question?.correct_answer || "0",
        points: question?.points || 1,
        explanation: question?.explanation || "",
        order: question?.order || 0,
    });

    const updateOption = (index, value) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData("options", newOptions);
    };

    const submit = (e) => {
        e.preventDefault();
        
        const formData = {
            ...data,
            options: data.options.filter(opt => opt.trim() !== ""),
        };
        
        if (question) {
            put(route("admin.learning.quizzes.questions.update", [quizId, question.id]), {
                data: formData,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        } else {
            post(route("admin.learning.quizzes.questions.store", quizId), {
                data: formData,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <h2 className="text-lg font-semibold">{question ? "Edit Pertanyaan" : "Tambah Pertanyaan"}</h2>

            <div>
                <Label htmlFor="question">Pertanyaan</Label>
                <Textarea
                    id="question"
                    value={data.question}
                    onChange={e => setData("question", e.target.value)}
                    rows={3}
                />
                <InputError message={errors.question} />
            </div>

            {[0, 1, 2, 3].map((index) => (
                <div key={index}>
                    <Label htmlFor={`option_${index}`}>Pilihan {String.fromCharCode(65 + index)}</Label>
                    <Input
                        id={`option_${index}`}
                        value={data.options[index]}
                        onChange={e => updateOption(index, e.target.value)}
                    />
                    <InputError message={errors[`options.${index}`]} />
                </div>
            ))}

            <div>
                <Label htmlFor="correct_answer">Jawaban Benar</Label>
                <select
                    id="correct_answer"
                    value={data.correct_answer}
                    onChange={e => setData("correct_answer", e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                    <option value="0">A</option>
                    <option value="1">B</option>
                    <option value="2">C</option>
                    <option value="3">D</option>
                </select>
                <InputError message={errors.correct_answer} />
            </div>

            <div>
                <Label htmlFor="points">Poin</Label>
                <Input
                    id="points"
                    type="number"
                    min="1"
                    value={data.points}
                    onChange={e => setData("points", e.target.value)}
                />
                <InputError message={errors.points} />
            </div>

            <div>
                <Label htmlFor="explanation">Penjelasan (Opsional)</Label>
                <Textarea
                    id="explanation"
                    value={data.explanation}
                    onChange={e => setData("explanation", e.target.value)}
                    rows={2}
                />
                <InputError message={errors.explanation} />
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
                    {question ? "Simpan Perubahan" : "Tambah Pertanyaan"}
                </Button>
            </div>
        </form>
    );
}

export default function Show({ quiz }) {
    const [open, setOpen] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);
    
    const handleDelete = (questionId) => {
        if (confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) {
            router.delete(route("admin.learning.quizzes.questions.destroy", [quiz.id, questionId]));
        }
    };

    const handleEdit = (question) => {
        setEditQuestion(question);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditQuestion(null);
    };

    return (
        <>
            <Head title={`Soal - ${quiz.title}`} />

            <AdminLayout>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <Link href={route("admin.learning.quizzes.index")}>
                            <Button variant="outline" size="sm">
                                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                                Kembali
                            </Button>
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {quiz.title}
                            </h1>
                            <p className="text-gray-600">{quiz.description}</p>
                        </div>
                        <Button onClick={() => setOpen(true)}>
                            <PlusIcon className="h-5 w-5 mr-2" />
                            Tambah Pertanyaan
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {quiz.questions?.map((question, index) => (
                            <Card key={question.id}>
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-2">
                                                {index + 1}. {question.question}
                                            </h3>
                                            <div className="space-y-1 text-sm">
                                                {question.options?.map((option, optIndex) => (
                                                    <p 
                                                        key={optIndex}
                                                        className={String(question.correct_answer) === String(optIndex) ? 'text-green-600 font-medium' : ''}
                                                    >
                                                        {String.fromCharCode(65 + optIndex)}. {option}
                                                    </p>
                                                ))}
                                            </div>
                                            {question.explanation && (
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Penjelasan: {question.explanation}
                                                </p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-400">
                                                Poin: {question.points || 1}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleEdit(question)}
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="destructive" 
                                                size="sm"
                                                onClick={() => handleDelete(question.id)}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {(!quiz.questions || quiz.questions.length === 0) && (
                            <div className="text-center py-8 text-gray-500">
                                Belum ada pertanyaan. Klik "Tambah Pertanyaan" untuk menambahkan.
                            </div>
                        )}
                    </div>

                    <Dialog open={open} onOpenChange={handleClose}>
                        <DialogContent className="max-w-2xl">
                            <QuestionForm 
                                quizId={quiz.id}
                                question={editQuestion}
                                onSuccess={handleClose} 
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </AdminLayout>
        </>
    );
}

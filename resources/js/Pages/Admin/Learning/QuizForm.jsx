import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/InputError";

export default function QuizForm({ moduleId, quiz = null, onSuccess }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        learning_module_id: moduleId,
        title: quiz?.title || "",
        description: quiz?.description || "",
        duration: quiz?.duration || "",
        passing_score: quiz?.passing_score || 70,
        order: quiz?.order || 0,
        _method: quiz ? "put" : "post"
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (quiz) {
            put(route("admin.learning.quizzes.update", quiz.id), {
                onSuccess: () => {
                    reset();
                    onSuccess();
                }
            });
        } else {
            post(route("admin.learning.quizzes.store"), {
                onSuccess: () => {
                    reset();
                    onSuccess();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <h2 className="text-lg font-semibold">{quiz ? "Edit Kuis" : "Tambah Kuis"}</h2>

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
                    {quiz ? "Perbarui" : "Simpan"}
                </Button>
            </div>
        </form>
    );
}
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/InputError";

export default function VideoForm({ moduleId, video = null, onSuccess }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        learning_module_id: moduleId,
        title: video?.title || "",
        description: video?.description || "",
        url: video?.url || "",
        duration: video?.duration || "",
        order: video?.order || 0,
        _method: video ? "put" : "post"
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (video) {
            put(route("admin.videos.update", video.id), {
                onSuccess: () => {
                    reset();
                    onSuccess();
                }
            });
        } else {
            post(route("admin.videos.store"), {
                onSuccess: () => {
                    reset();
                    onSuccess();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <h2 className="text-lg font-semibold">{video ? "Edit Video" : "Tambah Video"}</h2>

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
                    {video ? "Perbarui" : "Simpan"}
                </Button>
            </div>
        </form>
    );
}
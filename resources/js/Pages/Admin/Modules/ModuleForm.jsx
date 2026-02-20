import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/InputError";
import { Switch } from "@/Components/ui/switch";

export default function ModuleForm({ module = null, onSuccess }) {
    const { data, setData, post, put, processing, errors, reset, progress } = useForm({
        title: module?.title || "",
        description: module?.description || "",
        thumbnail: null,
        document: null,
        order: module?.order || 0,
        is_active: module?.is_active ?? true,
        _method: module ? "put" : "post"
    });

    const submit = (e) => {
        e.preventDefault();
        
        if (module) {
            put(route("admin.modules.update", module.id), {
                onSuccess: () => {
                    reset();
                    onSuccess();
                }
            });
        } else {
            post(route("admin.modules.store"), {
                onSuccess: () => {
                    reset();
                    onSuccess();
                }
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
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
                    onCheckedChange={checked => setData("is_active", checked)}
                />
                <Label htmlFor="is_active">Aktif</Label>
                <InputError message={errors.is_active} />
            </div>

            <div className="flex justify-end">
                <Button 
                    type="submit" 
                    className="ml-auto" 
                    disabled={processing}
                >
                    {module ? "Perbarui" : "Simpan"}
                </Button>
            </div>
        </form>
    );
}
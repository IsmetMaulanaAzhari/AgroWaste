<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LearningModule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LearningModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modules = LearningModule::orderBy('order')->paginate(10);
        
        return Inertia::render('Admin/LearningModules/Index', [
            'modules' => $modules
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        if ($request->hasFile('document')) {
            $validated['document'] = $request->file('document')->store('modules', 'public');
        }

        LearningModule::create($validated);

        return redirect()->route('admin.learning.modules.index')
            ->with('message', 'Modul pembelajaran berhasil dibuat');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LearningModule $learningModule)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail
            if ($learningModule->thumbnail) {
                Storage::disk('public')->delete($learningModule->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        if ($request->hasFile('document')) {
            // Delete old document
            if ($learningModule->document) {
                Storage::disk('public')->delete($learningModule->document);
            }
            $validated['document'] = $request->file('document')->store('modules', 'public');
        }

        $learningModule->update($validated);

        return redirect()->route('admin.learning.modules.index')
            ->with('message', 'Modul pembelajaran berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LearningModule $learningModule)
    {
        // Delete files if they exist
        if ($learningModule->thumbnail) {
            Storage::disk('public')->delete($learningModule->thumbnail);
        }
        if ($learningModule->document) {
            Storage::disk('public')->delete($learningModule->document);
        }

        $learningModule->delete();

        return redirect()->route('admin.learning.modules.index')
            ->with('message', 'Modul pembelajaran berhasil dihapus');
    }
}

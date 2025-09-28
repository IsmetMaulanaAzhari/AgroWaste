<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Waste;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WasteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wastes = Waste::latest()->paginate(10);
        
        return Inertia::render('Admin/Wastes/Index', [
            'wastes' => $wastes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Wastes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'type' => 'required|in:organic,plastic,paper,metal,glass',
            'recycling_process' => 'nullable|string',
            'benefits' => 'nullable|string',
            'is_recyclable' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('wastes', 'public');
        }

        Waste::create($validated);

        return redirect()->route('admin.wastes.index')->with('message', 'Data limbah berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Waste $waste)
    {
        return Inertia::render('Admin/Wastes/Show', [
            'waste' => $waste
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Waste $waste)
    {
        return Inertia::render('Admin/Wastes/Edit', [
            'waste' => $waste
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Waste $waste)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'type' => 'required|in:organic,plastic,paper,metal,glass',
            'recycling_process' => 'nullable|string',
            'benefits' => 'nullable|string',
            'is_recyclable' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($waste->image) {
                Storage::disk('public')->delete($waste->image);
            }
            
            $validated['image'] = $request->file('image')->store('wastes', 'public');
        }

        $waste->update($validated);

        return redirect()->route('admin.wastes.index')->with('message', 'Data limbah berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Waste $waste)
    {
        // Delete image if exists
        if ($waste->image) {
            Storage::disk('public')->delete($waste->image);
        }

        $waste->delete();

        return redirect()->route('admin.wastes.index')->with('message', 'Data limbah berhasil dihapus');
    }
}

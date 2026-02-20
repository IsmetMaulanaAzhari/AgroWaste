<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learning_module_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('thumbnail')->nullable();
            $table->string('url'); // URL video (YouTube, Vimeo, dll)
            $table->integer('duration')->nullable(); // Durasi dalam detik
            $table->integer('order')->default(0); // Urutan video dalam modul
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};

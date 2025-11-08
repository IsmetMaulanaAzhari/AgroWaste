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
        Schema::create('wastes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('image')->nullable(); // Menambahkan kolom untuk gambar
            $table->enum('type', ['organic', 'plastic', 'paper', 'metal', 'glass'])->default('organic');
            $table->text('recycling_process')->nullable();
            $table->text('benefits')->nullable();
            $table->boolean('is_recyclable')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wastes');
    }
};

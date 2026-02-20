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
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->text('question');
            $table->json('options'); // Array pilihan jawaban
            $table->string('correct_answer');
            $table->integer('points')->default(1); // Poin untuk jawaban benar
            $table->text('explanation')->nullable(); // Penjelasan jawaban
            $table->integer('order')->default(0); // Urutan pertanyaan dalam kuis
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
    }
};

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
        Schema::create('politics', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('office');
            $table->integer('age');
            $table->string('since');
            $table->tinyInteger('status')->nullable();
            $table->integer('vote_jail')->nullable();
            $table->integer('vote_no_jail')->nullable();
            $table->longText('normal_photo');
            $table->longText('jail_photo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('politics');
    }
};

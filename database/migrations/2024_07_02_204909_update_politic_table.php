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
        //
        Schema::table('politics', function (Blueprint $table) {
            // $table->integer('age')->nullable();
            $table->string('political_party')->nullable()->after('age');

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

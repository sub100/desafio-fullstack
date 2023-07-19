<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 50);
            $table->string('cpf', 14);
            $table->string('rg', 50);
            $table->string('cep', 9);
            $table->string('cidade', 100);
            $table->string('uf', 2);
            $table->string('logradouro', 100);
            $table->string('bairro', 100);
            $table->integer('numero');
            $table->string('complemento', 100)->nullable();
            $table->string('parentesco', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuários');
    }
};

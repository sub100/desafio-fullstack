<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $hidden = [
        'senha',
    ];
    protected $table = 'usuario';
    protected $fillable = [
        'nome',
        'email',
        'senha',
        'cpf',
        'cep',
        'rua',
        'numero',
        'bairro',
        'cidade',
        'estado',
        'data_nascimento',
        'telefone',
        'mae',
        'pai',
        'criado_em',
        'atualizado_em',
    ];
}

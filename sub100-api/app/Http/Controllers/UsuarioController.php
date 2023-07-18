<?php

namespace App\Http\Controllers;

use App\Http\Requests\CriarUsuarioRequest;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Termwind\Components\Dd;
use DateTimeImmutable;

class UsuarioController extends Controller {
    public function listarUsuario($idUsuario) {
        if ( (int)$idUsuario === 0 ) {
            return response()->json(['message' => 'Id inválido'], 404);
        }

        $usuario = Usuario::find($idUsuario);
        if ( $usuario === null ) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        return response()->json($usuario);
    }

    public function listarTodosOsUsuarios() {
        $usuarios = Usuario::orderBy('updated_at', 'desc')->paginate(5);

        return response()->json($usuarios);
    }

    public function criarUsuario(Request $request) {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'email' => 'required|string|unique:usuario|max:255|regex:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/|',
            'senha' => 'required|string|max:255',
            'dataNascimento' => 'required|string',
            'cpf' => 'required|string|regex:/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/',
            'telefone' => 'required|string|regex:/^[0-9]{2}[0-9]{4,5}[0-9]{4}$/',
            'cep' => 'required|string|max:9',
            'rua' => 'required|string|max:255',
            'numero' => 'required|string|max:255',
            'bairro' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $dataNascimennto = (new DateTimeImmutable($request->input('dataNascimento')))
            ->format('Y-m-d');

        $usuario = Usuario::create([
            'nome' => $request->input('nome'),
            'email' => $request->input('email'),
            'senha' => password_hash($request->input('senha'), PASSWORD_DEFAULT),
            'data_nascimento' => $dataNascimennto,
            'cpf' => $request->input('cpf'),
            'telefone' => $request->input('telefone'),
            'cep' => $request->input('cep'),
            'rua' => $request->input('rua'),
            'numero' => $request->input('numero'),
            'bairro' => $request->input('bairro'),
            'cidade' => $request->input('cidade'),
            'estado' => $request->input('estado'),
        ]);

        if ( !$usuario ) {
            return response()->json(['message' => 'Erro ao criar usuário'], 500);
        }

        return response()->json([
            'message' => 'Usuário criado com sucesso',
            'usuario' => $usuario,
        ], 201);
    }

    public function atualizarUsuario(Request $request, $idUsuario) {
        $validator = Validator::make($request->all(), [
            'nome' => 'string|max:255',
            'email' => 'sometimes|unique:usuario|max:255',
            'senha' => 'sometimes|max:255',
            'data_nascimento' => 'required|date_format:d/m/Y|before:today',
            'cpf' => 'string|regex:/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/',
            'telefone' => 'string|regex:/^\([1-9]{2}\) [2-9][0-9]{3}\-[0-9]{4}$/',
            'cep' => 'string|max:9',
            'rua' => 'string|max:255',
            'numero' => 'string|max:255',
            'bairro' => 'string|max:255',
            'cidade' => 'string|max:255',
            'estado' => 'string|max:255',
            'mae' => 'sometimes|max:255',
            'pai' => 'sometimes|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $fillableFields = [
            'nome',
            'senha',
            'data_nascimento',
            'cpf',
            'telefone',
            'cep',
            'rua',
            'numero',
            'bairro',
            'cidade',
            'estado',
            'mae',
            'pai',
        ];

        $usuario = Usuario::findOrFail($idUsuario);
        $usuario->fill($request->only($fillableFields));
        $dataNascimennto = strtotime($request->input('data_nascimento'));
        $usuario->data_nascimento = date('Y-m-d', $dataNascimennto);

        if ( $request->has('senha') ) {
            $usuario->senha = password_hash($request->input('senha'), PASSWORD_DEFAULT);
        }

        $usuario->email = $request->input('email') ? $request->input('email') : $usuario->email;

        if ( !$usuario->save() ) {
            return response()->json(['message' => 'Erro ao atualizar usuário'], 500);
        }

        return response()->json(['message' => 'Usuário atualizado com sucesso']);
    }

    public function excluirUsuario($idUsuario) {
        $usuario = Usuario::find($idUsuario);
        if ( $usuario === null ) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        $deletarUsuario = Usuario::destroy($idUsuario);
        if ( !$deletarUsuario ) {
            return response()->json(['message' => 'Erro ao excluir usuário'], 500);
        }

        return response()->json(['message' => 'Usuário excluído com sucesso']);
    }
}

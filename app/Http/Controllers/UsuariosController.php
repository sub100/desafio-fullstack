<?php

namespace App\Http\Controllers;

use App\Http\Requests\UsuariosFormRequest;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuariosController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function listar()
    {
        $usuarios = (new Usuario())->all();

        return response()->json($usuarios);
    }

    public function salvar(UsuariosFormRequest $request)
    {
        $dados = $request->all();

        $usuario = (new Usuario());
        $usuario->nome = $dados['nome'];
        $usuario->cpf = $dados['cpf'];
        $usuario->rg = $dados['rg'];
        $usuario->cep = $dados['cep'];
        $usuario->cidade = $dados['cidade'];
        $usuario->uf = $dados['uf'];
        $usuario->logradouro = $dados['logradouro'];
        $usuario->bairro = $dados['bairro'];
        $usuario->numero = $dados['numero'];
        $usuario->complemento = $dados['complemento'] ?? null;
        $usuario->parentesco = $dados['parentesco'];
        $usuario->save();

        return response()->json('Usuário salvo com sucesso');
    }

    public function editar($id)
    {
        $usuario = (new Usuario())->find($id);
        return response()->json($usuario);
    }

    public function atualizar(UsuariosFormRequest $request, $id)
    {
        $dados = $request->all();

        $usuario = (new Usuario())->find($id);
        $usuario->nome = $dados['nome'];
        $usuario->cpf = $dados['cpf'];
        $usuario->rg = $dados['rg'];
        $usuario->cep = $dados['cep'];
        $usuario->cidade = $dados['cidade'];
        $usuario->uf = $dados['uf'];
        $usuario->logradouro = $dados['logradouro'];
        $usuario->bairro = $dados['bairro'];
        $usuario->numero = $dados['numero'];
        $usuario->complemento = $dados['complemento'] ?? null;
        $usuario->parentesco = $dados['parentesco'];
        $usuario->update($dados);

        return response()->json('Usuário atualizado com sucesso');
    }

    public function excluir($id)
    {
        $usuario = (new Usuario())->find($id);
        $usuario->delete();

        return response()->json('Usuário excluído com sucesso');
    }
}

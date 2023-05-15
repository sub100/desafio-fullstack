<?php

include_once("../inc/conexao.php");
include("../model/usuario.php");

if ($_GET["acao"] == "listUsuarios") {

    $jaTem = false;
    $data = "";

    foreach (Usuario::getAll() as $usuario) {
        if ($jaTem)
            $data.= ",";
        $jaTem = true;

        $data.= "[
            \"{$usuario->id}\",
            \"{$usuario->nome}\",
            \"{$usuario->getDataNascimento()}\",
            \"{$usuario->getSexo()}\",
            \"{$usuario->cpf}\",
            \"{$usuario->cep}\",
            \"{$usuario->getParentesco()}\",
            \"{$usuario->getDataAlteracao()}\",
            \"<a href='?pg=usuario-form&id={$usuario->id}'>Alterar</a> | <a href='#' class='btnDelete' id='{$usuario->id}'>Excluir</a>\"
        ]";
    }

    exit ('{
        "data": [
            '.$data.'
        ]
      }');

} if ($_POST["acao"] == "verificaAlteracoes") {

    $usuario = Usuario::getUltimaAlteracao($_POST["id"]);

    exit("{
        \"id\": \"$usuario->id\",
        \"dataalteracao\": \"$usuario->dataalteracao\"
    }");

} else if ($_POST["acao"] == "delete") {

    Usuario::deleteById($_POST["id"]);
    $mensagem = "Usuário deletado com sucesso!";

} else if ($_POST) {
    
    if ($_POST["id"] > 0)
        $usuario = Usuario::getById($_POST["id"]);
    else
        $usuario = new Usuario();
        
    $usuario->setNome($_POST["nome"]);
    $usuario->setDatanascimento($_POST["datanascimento"]);
    $usuario->setSexo($_POST["sexo"]);
    $usuario->setCpf($_POST["cpf"]);
    $usuario->setCep($_POST["cep"]);
    $usuario->setLogradouro($_POST["logradouro"]);
    $usuario->setNumero($_POST["numero"]);
    $usuario->setComplemento($_POST["complemento"]);
    $usuario->setBairro($_POST["bairro"]);
    $usuario->setLocalidade($_POST["localidade"]);
    $usuario->setUf($_POST["uf"]);
    $usuario->setParentesco($_POST["parentesco"]);

    if ($_POST["id"] > 0) {
        $usuario->update();
        $mensagem = "Usuário alterado com sucesso!";
    } else {
        $usuario->insert();
        $mensagem = "Usuário cadastrado com sucesso!";
    }

} else {
    $mensagem = "ERRO!";
}

exit("{
    \"mensagem\": \"$mensagem\"
}");

?>
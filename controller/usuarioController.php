<?php

if ($_POST) {
    
    include_once("../inc/conexao.php");
    include("../model/usuario.php");

    if ($_POST["id"] > 0) {

        /*$sqlUsuario =
            "UPDATE usuario SET
                    tipopessoa = ".tratarDadoNulo($_POST["tipopessoa"]).",
                    fantasia = ".tratarDadoNulo($_POST["fantasia"]).",
                    cns = ".tratarDadoNulo($_POST["cns"]).",
                    nomedainstituicao = ".tratarDadoNulo($_POST["nomedainstituicao"])."
              WHERE id = '".tratarDado($_POST["id"])."'";
        query($sqlUsuario, $resUsuario);*/

        $mensagem = "Usuário alterado com sucesso!";

    } else {
        
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
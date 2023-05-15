<?php

include("model/usuario.php");

echo "<table id='dtUsuarios' class='table table-striped table-bordered' cellspacing='0' width='100%'>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data nascimento</th>
            <th>Sexo</th>
            <th>CPF</th>
            <th>CEP</th>
            <th>Parentesco</th>
            <th>Alteração</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>";

        foreach (Usuario::getAll() as $usuario) {
            echo "<tr>
                <td>{$usuario->id}</td>
                <td>{$usuario->nome}</td>
                <td>{$usuario->getDataNascimento()}</td>
                <td>{$usuario->getSexo()}</td>
                <td>{$usuario->cpf}</td>
                <td>{$usuario->cep}</td>
                <td>{$usuario->getParentesco()}</td>
                <td>{$usuario->getDataAlteracao()}</td>
                <td><a href='?pg=usuario-form&id={$usuario->id}'>Alterar</a> | <a href='#'>Excluir</a></td>
            </tr>";
        }

    echo "</tbody>
</table>";
?>
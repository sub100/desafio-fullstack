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
        </tr>
    </thead>
    <tbody>";

        foreach (Usuario::getAll() as $linhaUsuario) {
            echo "<tr>
                <td>{$linhaUsuario->id}</td>
                <td>{$linhaUsuario->nome}</td>
                <td>{$linhaUsuario->getDataNascimento()}</td>
                <td>{$linhaUsuario->getSexo()}</td>
                <td>{$linhaUsuario->cpf}</td>
                <td>{$linhaUsuario->cep}</td>
                <td>{$linhaUsuario->getParentesco()}</td>
                <td>{$linhaUsuario->getDataAlteracao()}</td>
            </tr>";
        }

    echo "</tbody>
</table>";
?>
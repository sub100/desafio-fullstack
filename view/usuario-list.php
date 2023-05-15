<?php

@include_once("../inc/conexao.php");
include(ROOT_SITE."model/usuario.php");

echo "<div id='loadDataUsuarios'>
<table id='dtUsuarios' class='table table-striped table-bordered' cellspacing='0' width='100%'>
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
</table>
</div>";
?>
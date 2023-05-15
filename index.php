<?php
include("inc/conexao.php");
?>

<!doctype html>
<html lang="pt-br">
  <head>
    <meta name="charset" content="utf-8" />
    <meta charset="utf-8">
    <meta http-equiv="content-language" content="pt-br"/>

    <title>Desafio SUB100 - Gustavo Vieira de Moura</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" rel="stylesheet">
  </head>
  <body>
    <div class='container'>
        <a class='btn btn-primary' href='?pg=usuario-list'>Listar Usuários</a>
        <a class='btn btn-primary' href='?pg=usuario-form'>Cadastrar Usuários</a>
    </div>
    <div class='container'>
      <?php
      if ($_GET["pg"]) {
          include("view/{$_GET["pg"]}.php");
      }
      ?>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>

    <?php
    if ($_GET["pg"] && file_exists("view/{$_GET["pg"]}.js")) {
        echo "<script type='text/javascript' src='view/{$_GET["pg"]}.js'></script>";
    }
    ?>

  </body>
</html>



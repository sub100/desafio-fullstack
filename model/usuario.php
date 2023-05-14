<?php

include("helper/datetimeHelper.php");

class Usuario {
    public $id;
    public $nome;
    public $datanascimento;
    public $sexo;
    public $cpf;
    public $cep;
    public $logradouro;
    public $numero;
    public $complemento;
    public $bairro;
    public $localidade;
    public $uf;
    public $parentesco;
    public $dataalteracao;

    public static function getAll() {
        global $dbh;

        $sqlUsuario = 
            "SELECT id,
                    nome,
                    datanascimento,
                    sexo,
                    cpf,
                    cep,
                    parentesco,
                    dataalteracao
            FROM usuario
            ORDER BY dataalteracao DESC ";

        $resUsuario = $dbh->query($sqlUsuario);

        return $resUsuario->fetchAll(PDO::FETCH_CLASS, "Usuario");
    }

    public function getDataNascimento() {
        return DateTimeHelper::convertDateToString($this->datanascimento);
    }

    public function getSexo() {
        if ($this->sexo == "M") {
            return "Masculino";
        } else {
            return "Feminino";
        }
    }

    public function getParentesco() {
        if ($this->parentesco == "P") {
            return "Pai";
        } else if ($this->parentesco == "M") {
            return "Mãe";
        } else if ($this->parentesco == "F") {
            return "Filho";
        }
    }

    public function getDataAlteracao() {
        return DateTimeHelper::convertDateTimeToString($this->dataalteracao);
    }

}

?>
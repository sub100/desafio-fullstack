<?php

include(ROOT_SITE."helper/datetimeHelper.php");

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

    public function setNome($nome){
        $this->nome = $nome;
    }

    public function setDataNascimento($datanascimento){
        $this->datanascimento = $datanascimento;
    }

    public function setSexo($sexo){
        $this->sexo = $sexo;
    }

    public function setCpf($cpf){
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
        $this->cpf = $cpf;
    }

    public function setCep($cep){
        $cep = preg_replace('/[^0-9]/', '', $cep);
        $this->cep = $cep;
    }

    public function setLogradouro($logradouro){
        $this->logradouro = $logradouro;
    }

    public function setNumero($numero){
        $this->numero = $numero;
    }

    public function setComplemento($complemento){
        $this->complemento = $complemento;
    }

    public function setBairro($bairro){
        $this->bairro = $bairro;
    }

    public function setLocalidade($localidade){
        $this->localidade = $localidade;
    }

    public function setUf($uf){
        $this->uf = $uf;
    }

    public function setParentesco($parentesco){
        $this->parentesco = $parentesco;
    }

    public function insert() {
        global $dbh;

        $sqlUsuario = 
            "INSERT INTO usuario
                    (nome,
                    datanascimento,
                    sexo,
                    cpf,
                    cep,
                    logradouro,
                    numero,
                    complemento,
                    bairro,
                    localidade,
                    uf,
                    parentesco,
                    dataalteracao)
            VALUES (:nome,
                    :datanascimento,
                    :sexo,
                    :cpf,
                    :cep,
                    :logradouro,
                    :numero,
                    :complemento,
                    :bairro,
                    :localidade,
                    :uf,
                    :parentesco,
                    NOW())";

        $statement = $dbh->prepare($sqlUsuario);

        $sucesso = $statement->execute([
            ':nome' => $this->nome,
            ':datanascimento' => $this->datanascimento,
            ':sexo' => $this->sexo,
            ':cpf' => $this->cpf,
            ':cep' => $this->cep,
            ':logradouro' => $this->logradouro,
            ':numero' => $this->numero,
            ':complemento' => $this->complemento,
            ':bairro' => $this->bairro,
            ':localidade' => $this->localidade,
            ':uf' => $this->uf,
            ':parentesco' => $this->parentesco,
        ]);

        if ($sucesso)
            return $dbh->lastInsertId();
        else
            return "Erro";
    }

}

?>
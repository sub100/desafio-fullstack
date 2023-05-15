<?php

include("BaseApi.php");
include("../model/Usuario.php");

class UsuarioApi extends BaseApi
{
    public function getAll()
    {
        try {
            $usuarios = Usuario::getAll();
            $responseData = json_encode($usuarios);

            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } catch (Error $e) {
            $this->sendOutput(
                json_encode(array('error' => $e->getMessage().'Erro.')), 
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );
        }
    }

    public function getById()
    {
        try {
            $usuarios = Usuario::getById($_GET['id']);
            $responseData = json_encode($usuarios);

            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } catch (Error $e) {
            $this->sendOutput(
                json_encode(array('error' => $e->getMessage().'Erro.')), 
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );
        }
    }

    public function deleteById()
    {
        try {
            Usuario::deleteById($_GET['id']);
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } catch (Error $e) {
            $this->sendOutput(
                json_encode(array('error' => $e->getMessage().'Erro.')), 
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );
        }
    }

    public function insert()
    {
        try {
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Methods: POST");
            header("Access-Control-Max-Age: 3600");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

            $data = json_decode(file_get_contents("php://input"));

            $usuario = new Usuario();
            $usuario->setNome($data->nome);
            $usuario->setDatanascimento($data->datanascimento);
            $usuario->setSexo($data->sexo);
            $usuario->setCpf($data->cpf);
            $usuario->setCep($data->cep);
            $usuario->setLogradouro($data->logradouro);
            $usuario->setNumero($data->numero);
            $usuario->setComplemento($data->complemento);
            $usuario->setBairro($data->bairro);
            $usuario->setLocalidade($data->localidade);
            $usuario->setUf($data->uf);
            $usuario->setParentesco($data->parentesco);
            $usuario->insert();
            
            $responseData = json_encode($usuario);

            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } catch (Error $e) {
            $this->sendOutput(
                json_encode(array('error' => $e->getMessage().'Erro.')), 
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );
        }
    }

    public function update()
    {
        try {
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Methods: POST");
            header("Access-Control-Max-Age: 3600");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

            $data = json_decode(file_get_contents("php://input"));

            $usuario = Usuario::getById($data->id);
            if ($usuario == null) {
                $this->sendOutput(
                    json_encode(array('error' => 'O usuário não foi encontrado.')), 
                    array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
                );
            }

            $usuario->setNome($data->nome);
            $usuario->setDatanascimento($data->datanascimento);
            $usuario->setSexo($data->sexo);
            $usuario->setCpf($data->cpf);
            $usuario->setCep($data->cep);
            $usuario->setLogradouro($data->logradouro);
            $usuario->setNumero($data->numero);
            $usuario->setComplemento($data->complemento);
            $usuario->setBairro($data->bairro);
            $usuario->setLocalidade($data->localidade);
            $usuario->setUf($data->uf);
            $usuario->setParentesco($data->parentesco);
            $usuario->update();
            
            $responseData = json_encode($usuario);

            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } catch (Error $e) {
            $this->sendOutput(
                json_encode(array('error' => $e->getMessage().'Erro.')), 
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error')
            );
        }
    }
}

$usuarioApi = new UsuarioApi();
$usuarioApi->{$_GET["acao"]}();

?>
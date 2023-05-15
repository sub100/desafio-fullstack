# How to run

## Introdução

Foi desenvolvido um projeto para manutenção completa de usuários, contendo listagem, cadastro, edição e exclusão tanto por tela quanto api.

## Configuração

Abaixo está as instruções para configuração do ambiente para implantação da solução.

### Banco de dados

Primeiro deverá ser criada a base de dados e ser executado o script abaixo para a criação da tabela.

```sql
CREATE TABLE usuario (
  id INT(18) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  datanascimento DATE NOT NULL,
  sexo CHAR(1) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  cep VARCHAR(9) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero VARCHAR(20) NOT NULL,
  complemento VARCHAR(100) NULL,
  bairro VARCHAR(100) NOT NULL,
  localidade VARCHAR(100) NOT NULL,
  uf CHAR(2) NOT NULL,
  parentesco CHAR(1) NULL,
  dataalteracao DATETIME NOT NULL,
  PRIMARY KEY(id)
);
```

### Código fonte

Deverá ser realizada a cópia dos códigos para o ambiente apache que deseja ser executado projeto.
Também deverá ser parametrizado o arquivo `inc/conexao.php` com a **string de conexão mysql**, **usuário** e **senha**.
Também deve ser definido o **diretório raiz** do projeto, na variável `ROOT_SITE` no mesmo arquivo mencionado acima.

## Acessar o projeto por telas

Para acessar o projeto por tela, basta acessar a url do projeto no servidor apache no navegador de preferência (Ex: Google Chrome).
Ao acessar, estarão disponíveis dois botões.
Um deles, `Listar Usuários`, que irá direcionar para a página que listará todos os usuários da base de dados. Além da listagem, é possível editar e/ou excluir os usuários já cadastrados.
O segundo botão, `Cadastrar Usuários`, que irá direcionar para o formulário de cadastro de usuários.

## Acessar o projeto por API

Para acessar o projeto por api, basta acessar a url do projeto no servidor apache no aplicativo rest de preferência (Ex: Postman), acrescentando `/api`.
Foi disponibilizado o serviço para manutenção de usuários no endereço `/usuarioApi.php`, e para acessar os métodos, deve ser adicionado à url, `acao=*acao*` (Ex: `/api/usuarioApi.php?acao=getAll`).
- Métodos:
**getAll**: Este método irá retornar todos os usuários cadastrados.
**getById**: Este método irá retornar o usuário do id informado. Deve ser acrescentado o parâmetro `id=*id*`.
**deleteById**: Este método irá delete o usuário do id informado. Deve ser acrescentado o parâmetro `id=*id*`.
**insert**: Este método irá incluir um novo usuário na base de dados. As informações do usuário deve ser passada via json, conforme exemplo abaixo:
```json
{
   "nome":"João da Silva",
   "datanascimento":"1980-10-10",
   "sexo":"M",
   "cpf":"25026177581",
   "cep":"87023150",
   "logradouro":"Rua Pioneiro Sebastião Alves",
   "numero":"100",
   "complemento":"",
   "bairro":"Jardim Paris III",
   "localidade":"Maringá",
   "uf":"PR",
   "parentesco":"P"
}
```
**update**: Este método irá alterar um usuário existente na base de dados. As informações do usuário deve ser passada via json, conforme exemplo abaixo:
```json
{
   "id":"1",
   "nome":"João da Silva",
   "datanascimento":"1980-10-10",
   "sexo":"M",
   "cpf":"25026177581",
   "cep":"87023150",
   "logradouro":"Rua Pioneiro Sebastião Alves",
   "numero":"100",
   "complemento":"",
   "bairro":"Jardim Paris III",
   "localidade":"Maringá",
   "uf":"PR",
   "parentesco":"P"
}
```
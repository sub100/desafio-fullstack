# Desafio Fullstack Sub100 Sistemas
O objetivo deste desafio é avaliar o domínio do candidato no desenvolvimento fullstack. Será avaliado boas práticas de code style, organização do projeto, criação de APIs, conhecimento de frameworks e tecnologias.

## Instruções gerais
- Faça um fork deste repositório para realizar o desafio.
- Quando terminar nos envie um pull request para avaliarmos seus conhecimentos.
- Não esqueça de nos ensinar como rodar o seu desafio. Utilize o arquivo HOWTORUN.md para as instruções.

O desafio consiste em um CRUD de usuários.<br>
Esperamos que o projeto tenha duas páginas. Uma para a **listagem de usuários** e outra com **formulário de cadastro/edição**.<br>
O usuário deverá ter informações de dados pessoais básicos, endereço e parentesco, onde os *dados pessoais* e *endereço* são obrigatórios.

## Front-end
- Nós utilizamos Vue.js ou Jquery.
- A página de listagem de usuários deverá ser paginada e ordenada por data de alteração.
- Se as informações de algum usuário forem alteradas, a página de listagem deverá ser atualizada sem a necessidade do recarregamento da página.
- No formulário, o campo `Cep` deve ser integrado com a API da [ViaCEP](https://viacep.com.br/) para preenchimento automático dos campos de endereço.  

## Back-end
- Nós utilizamos Laravel ou PHP puro Orientado a Objetos
- Crie uma API REST para o CRUD de usuários, fazendo uso das boas práticas.
- Utilize MySQL para a persistência dos dados dos usuários cadastrados.

## Diferenciais
- Autenticação na API com JWT
- Utilização do Docker para o ambiente de desenvolvimento com um docker-compose.yml
- Adicionar os contatos do usuário (telefones e emails) com um relacionamento muitos para muitos

Bom desafio 😎

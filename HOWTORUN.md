# How to run

# Requisitos para rodar o teste

-   O PHP deve estar na versão 8.1 ou superior
-   Ter o composer instalado

# Instalação

-   Abrir um terminal e executar o comando "composer install"
-   Copiar e renomear o arquivo .env.example para .env
-   Executar o comando "php artisan key:generate"
-   Criar a base de dados no mysql
-   Substituir na linha 14 o nome "laravel" pelo nome da base criada anteriormente
-   Caso o banco de dados possuir usuário e senha, substituir na linha 15 e 16
-   Executar o comando "php artisan migration" para criar as tabelas no banco

# Executando o projeto

-   Para executar o projeto em modo localhost, execute o comando php artisan serve
-   Abir um navegador e digitar o endereço http://127.0.0.1:8000

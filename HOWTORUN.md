# Como rodar

## Banco de dados
Navegar até a pasta onde está o projeto da Api
```
cd sub100-api
```
Comando para inciar o container docker
```
docker-compose build && docker-compose up -d
```

## Api
Navegar até a pasta onde está o projeto da Api
```
cd sub100-api
```

Instalar as dependências
```
composer install
```

Copiar o conteúdo do arquivo .env.example para .env

Iniciar o webserver da Api
```
php artisan serve
```

## Para rodar o Front-End
Navegar até a pasta onde está o Front-End
```
cd front-end
```

instalar as dependências:
```
npm install
```

Inicar o projeto
```
npm run dev
```

## Caso queira testar a paginação sem precisar criar dezenas de usuários na mão
```
php artisan db:seed --class=UsuarioTableSeeder
```
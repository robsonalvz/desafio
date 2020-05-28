# Desafio

# Frontend

## Stacks utilizadas
- ReactJS (Framework frontend)
- Redux e Redux Saga (Gerenciamento de estado e operações assincronas)
- Docker

## Arquitetura
- A arquitetura do serviço foi construida com ReactJs, Redux e Redux saga para facilitar a implementação e gerenciamento de estado dentro da aplicação. 

Os módulos do redux e redux saga foram separados seguindo o padrão Duck pattern.
- Store
  - Ducks
      - user
      - index
  - Sagas
      ....
  - index.js

## Instalação Local

Clonagem do diretório:
```
git clone https://github.com/robsonalvz/desafio
```

Entre dentro do projeto desafio-front
```
cd desafio-front
```

Instale as dependencias do projeto
```
yarn install
```

## Configuração

Criação do arquivo de configuração local, altere as configurações da URL da api e do Google Maps API de acordo com suas credenciais.
```
cp .env.example .env
```

## Rodando o projeto
```
yarn start
```
## Rodando o projeto com o Docker

Fique a vontade para colocar a porta desejada,  e o nome desejado para a imagem/container.
```
docker build -t desafio-front .
docker run --name desafio-front -p 3000:3000 desafio-front
```



# Backend

## Principais Stacks utilizadas
- Spring Boot
- Spring Security (Basic Auth)
- Spring data
- Lombok
- Docker

## Arquitetura
- A arquitetura do serviço foi construida com separação em módulos dos recursos

- com.desafio
  - config
  - exception
  - person
    - Person.java
    - PersonController.java
    - PersonService.java
    - PersonRepository.java
  - response
  - source
    - SourceController
  ...

## Instalação Local

Clonagem do diretório:
```
git clone https://github.com/robsonalvz/desafio
```

Entre dentro do projeto desafio-api
```
cd desafio-api
```

## Configuração

Com base no application.properties.example, voçê pode criar o seu próprio colocando todas as suas configurações
```

## Rodando o projeto com o Docker

Fique a vontade para colocar a porta desejada,  e o nome desejado para a imagem/container.
```
docker build -t desafio-api .
docker run --name desafio-api -p 9000:9000 desafio-api
```
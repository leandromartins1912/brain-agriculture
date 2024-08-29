# Brain Agriculture API

## Descrição

A **Brain Agriculture API** é uma API RESTful projetada para gerenciar dados de fazendas e produtores rurais. Ela permite a criação, leitura, atualização e exclusão (CRUD) de informações sobre produtores rurais, bem como a exibição de dados em um dashboard.

## Funcionalidades

- Listar todos os produtores rurais cadastrados.
- Cadastrar novos produtores rurais.
- Editar informações de produtores rurais existentes.
- Excluir produtores rurais.
- Dashboard com estatísticas das fazendas e plantações.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM para banco de dados)
- Postgress (para desenvolvimento local)
- Swagger (documentação da API)
- Jest (para testes)

## Requisitos

- Node.js (versão 14 ou superior)
- Docker (opcional, para execução em contêineres)
- Git

## Instalação e Configuração

### 1. Clonando o Repositório

Para começar, clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/brain-agriculture-api.git
cd brain-agriculture-api
```

### 2. Instalando Dependências

Instale as dependências necessárias utilizando o npm:

```bash
npm install
```

### 3. Configurando o Banco de Dados

A configuração do banco de dados já está pré-definida para utilizar o SQLite em ambiente de desenvolvimento. O arquivo de configuração está localizado em `./config/database.js`.

Se desejar, você pode alterar a configuração para utilizar outro banco de dados suportado pelo Sequelize (MySQL, PostgreSQL, etc.).

### 4. Executando a API

Para iniciar o servidor localmente, execute:

```bash
npm run dev
```

O servidor estará rodando na porta `3000`. Você pode acessá-lo através de `http://localhost:3000`.

### 5. Acessando a Documentação da API

A documentação da API está disponível no Swagger. Após iniciar o servidor, você pode acessá-la em:

```
http://localhost:3000/api-docs
```

## Testes

Para rodar os testes, utilize o comando:

```bash
docker-compose run test
```

Isso executará os testes utilizando o Jest.

## Executando com Docker

Se preferir rodar a API em um contêiner Docker, utilize os seguintes comandos:

### 1. Construir e iniciar o contêiner:

```bash
npm run docker
```

### 2. Parar o contêiner:

```bash
docker-compose down
```

## Estrutura de Diretórios

- `index.js` - Ponto de entrada da aplicação.
- `config/` - Configurações da aplicação, como banco de dados.
- `models/` - Modelos do Sequelize.
- `routes/` - Arquivos de rotas para os endpoints da API.
- `tests/` - Testes automatizados utilizando Jest.
- `swagger/` - Arquivos relacionados à documentação da API com Swagger.

Este projeto é licenciado sob a [MIT License](LICENSE).

---

Este `README.md` cobre o essencial para iniciar e operar a API em um ambiente local, bem como oferece informações sobre como contribuir para o projeto.

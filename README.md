# Brain Agriculture API & Frontend

## Descrição
A Brain Agriculture é uma aplicação completa, composta por uma API RESTful e um frontend, projetada para gerenciar dados de fazendas e produtores rurais. Ela permite operações CRUD (criação, leitura, atualização e exclusão) de informações sobre produtores rurais, além de exibir dados estatísticos através de um dashboard interativo.

## Funcionalidades

### API
- Listar todos os produtores rurais cadastrados.
- Cadastrar novos produtores rurais.
- Editar informações de produtores rurais existentes.
- Excluir produtores rurais.
- Exibir estatísticas de fazendas e plantações por meio de um dashboard.

### Frontend
- Visualizar produtores e fazendas cadastrados.
- Exibir gráficos de pizza com dados agrupados (fazendas por estado, cultura e uso do solo).
- Cadastrar, editar e excluir produtores via interface gráfica.
- Interações modernas com alertas e notificações usando **SweetAlert2**.

## Tecnologias Utilizadas

### Backend
- **Node.js** com **Express** para o servidor.
- **TypeORM** para ORM (mapeamento de dados).
- **PostgreSQL** como banco de dados relacional.
- **Swagger** para documentação da API.
- **Jest** para testes unitários e de integração.

### Frontend
- **React** para construção da interface do usuário.
- **Redux** e **Redux Toolkit** para gerenciamento de estado.
- **Axios** para realizar requisições HTTP.
- **Chart.js** e **react-chartjs-2** para visualização de dados com gráficos.
- **TailwindCSS** para estilização.
- **SweetAlert2** para feedbacks visuais (modais e alertas).

## Requisitos
- **Node.js** (versão 14 ou superior)
- **Docker** (opcional, para execução em contêineres)
- **Git** para controle de versão.

## Instalação e Configuração

### 1. Clonando o Repositório
Clone o repositório para sua máquina local:

```bash
git clone https://github.com/leandromartins1912/brain-agriculture.git
cd brain-agriculture
```

### 2. Instalando Dependências

##Backend:

```bash
cd api
npm install
```

##Frontend:

```bash
cd frontend
npm install
```

### 3. Configurando o Banco de Dados
A configuração do banco de dados utiliza o PostgreSQL. Configure o arquivo .env na pasta api para definir as variáveis de ambiente como a conexão com o banco de dados:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=brain_agriculture
```

### 4. Executando a API
Para iniciar o servidor localmente, vá até a pasta api e execute:

```bash
npm run dev
```

A API estará rodando na porta 3000. Acesse-a via http://localhost:3000.

### 5. Executando o Frontend
Para iniciar o frontend, vá até a pasta frontend e execute:

```bash
npm start
```

O frontend estará rodando na porta 3001. Acesse-o via http://localhost:3001.

### 6. Acessando a Documentação da API
A documentação da API está disponível via Swagger. Acesse-a após iniciar o servidor em:

```bash
http://localhost:3000/api-docs
```

### Testes
Para rodar os testes automatizados no backend, utilize o comando:

```bash
npm test
```

Isso executará os testes definidos no backend utilizando Jest.

### Executando com Docker
Se preferir rodar a aplicação em contêineres Docker, siga os seguintes passos:

#### 1 - Crie uma pasta e faça o clone dos projetos do backend e frontend.
#### 2 - Para iniciar o container, utilize o comando:

```bash
docker-compose up --build
```

#### 3 - Para encerrar o container, utilize o comando: 

```bash
docker-compose down
```

### Estrutura de Diretórios

### Backend (api/)
#### src/index.ts - Ponto de entrada da aplicação.
#### config/ - Configurações da aplicação, como banco de dados.
#### models/ - Modelos TypeORM para interagir com o banco de dados.
#### routes/ - Definições de rotas da API.
#### tests/ - Testes automatizados com Jest.
#### swagger/ - Arquivos para documentação da API com Swagger.

### Frontend (frontend/)
#### src/components/ - Componentes React.
#### src/redux/ - Gerenciamento de estado com Redux Toolkit.

### Contribuições
## Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

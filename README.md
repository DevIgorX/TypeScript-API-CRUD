# TypeScript-API-CRUD

Este projeto é uma API desenvolvida em TypeScript que simula um CRUD (Create, Read, Update, Delete) de uma concessionária de carros. A aplicação interage com um banco de dados PostgreSQL e utiliza o Knex.js como query builder.

## Funcionalidades

1. **Gerenciamento de carros**:
   - **Cadastrar Carro**: Permite cadastrar carros com informações como marca, modelo, ano, cor e valor.
   - **Listar Carros**: Retorna uma lista de todos os carros cadastrados no banco de dados.
   - **Detalhar Carro**: Retorna as informações detalhadas de um carro específico, com base no ID.
   - **Atualizar Carro**: Permite atualizar as informações de um carro existente.
   - **Excluir Carro**: Remove um carro do banco de dados com base no ID.

2. **Gerenciamento de usuários**:
   - **Cadastrar Usuário**: Permite criar uma conta de usuário com nome, email e senha. A senha é criptografada usando bcrypt.
   - **Login de Usuário**: Gera um token JWT para autenticação de usuários.
   - **Excluir Usuário**: Remove um usuário cadastrado no sistema.

3. **Autenticação JWT**:
   - Todas as rotas de gerenciamento de carros são protegidas por autenticação baseada em token JWT, garantindo que apenas usuários autenticados possam realizar essas operações.

## Tecnologias Utilizadas

- **TypeScript**: Tipagem estática para melhorar a segurança e a qualidade do código.
- **Express.js**: Framework para construção de APIs com Node.js.
- **Knex.js**: Query builder para facilitar a interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização dos usuários.
- **bcrypt**: Biblioteca para criptografia de senhas.

## Estrutura do Projeto

- **Banco de dados**: Scripts de criação de tabelas e conexão com o banco de dados.
- **Controladores**: Funções responsáveis pelo tratamento das requisições HTTP para carros e usuários.
- **Intermediários**: Middleware para autenticação JWT.
- **Rotas**: Definição das rotas da API, incluindo autenticação e operações CRUD.

## Como executar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/SeuUsuario/TypeScript-API-CRUD.git


<h1 align="center">Pontte Challenge</h1>

<p align="center">Nesse desafio, foi desenvolvida uma aplicação REST para geração, edição e listagem de contratos de empréstimos.</p>

<h1>Pré-requisitos</h1>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) -> use a versão LTS atual.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

O banco de dados que está sendo utilizado é o [PostgreSQL](https://www.postgresql.org/).

<h1>Preencha as variaveis de ambiente</h1>

Na pasta raiz do projeto, você ira encontrar um arquivo chamado <strong>.env.example</strong>

- Copie o conteúdo deste arquivo
- Crie um novo arquivo na pasta raiz do projeto, chamado <strong>.env</strong>
- Agora cole o conteúdo que foi copiado do arquivo <strong>.env.example</strong> dentro do novo arquivo
- É necessário preecher as variaveis para realizar a conexão com o banco de dados

**Abaixo estão listadas as variaveis**

```
# DATABASE
APP_DB_HOST=
APP_DB_PORT=
APP_DB_USER=
APP_DB_PASS=
APP_DB_NAME=

# API URL
API_URL=
```

<h1>🎲 Rodando o Back End (servidor) </h1>

```bash
# Clone este repositório
$ git clone <https://github.com/Guezin/pontte-challenge>

# Acesse a pasta do projeto no terminal/cmd
$ cd pontte-challenge

# Instale as dependências
$ npm install ou yarn

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server ou yarn dev:server

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

<h1>Requisições</h1>

**_OBS: Para criar um contrato é necessário seguir o seguinte fluxo_**

- criar usuário
- criar contrato
- enviar imagens
- aprovar/reprovar contrato

<br>

<strong>ENDPOINT 👉 criar usuário</strong>

```
[POST] http://localhost:3333/users
```

**_Exemplo de requisição_**

```
{
  name: 'John Doe',
  email: 'johndoe@email.com',
  cpf: '10699945887',
  date_of_birth: '30/11/1995',
  marital_status: 'solteiro',
  address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
  monthly_income: 5000
}
```

<br>

<strong>ENDPOINT 👉 editar usuário</strong>

```
[PUT] http://localhost:3333/users/update
```

**_Exemplo de requisição_**

```
{
  name: 'John Doe',
  email: 'johndoe@email.com',
  cpf: '10699945887',
  date_of_birth: '30/11/1995',
  marital_status: 'solteiro',
  address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
  monthly_income: 10000
}
```

<br>

<strong>ENDPOINT 👉 criar contrato</strong>

```
[POST] http://localhost:3333/contracts
```

**_Exemplo de requisição_**

```
{
	"user_id": <user_id_aqui>,
	"loan_amount": 120000
}
```

<br>

<strong>ENDPOINT 👉 editar contrato</strong>

```
[PUT] http://localhost:3333/contracts/update
```

**_Exemplo de requisição_**

```
{
	"contract_id": <contract_id_aqui>,
	"loan_amount": 65000
}
```

<br>

<strong>ENDPOINT 👉 listar contrato</strong>

```
[GET] http://localhost:3333/contracts/<contract_id_aqui>
```

<br>

<strong>ENDPOINT 👉 listar todos contratos</strong>

```
[GET] http://localhost:3333/contracts
```

<br>

<strong>ENDPOINT 👉 enviar documentos</strong>

```
[POST] http://localhost:3333/documents?contract_id=<contract_id_aqui>
```

**_Exemplo de requisição_**

```
# Multipart Form

personal_document: "imagem_cpf_ou_cnh.png",
proof_of_income: "imagem_comprovante_renda.png"
immobile: "imagem_imovel.png"
```

<br>

<strong>ENDPOINT 👉 editar documentos</strong>

```
[PUT] http://localhost:3333/documents/update?document_id=<document_id_aqui>
```

**_Exemplo de requisição_**

```
# Multipart Form

personal_document: "imagem_cpf_ou_cnh_nova.png",
proof_of_income: "imagem_comprovante_renda_nova.png"
immobile: "imagem_imovel_nova.png"
```

<br>

<strong>ENDPOINT 👉 aprovar contrato</strong>

```
[PATCH] http://localhost:3333/contracts/approved
```

**_Exemplo de requisição_**

```
{
	"contract_id": <contract_id_aqui>
}
```

<br>

<strong>ENDPOINT 👉 reprovar contrato</strong>

```
[PATCH] http://localhost:3333/contracts/rejected
```

**_Exemplo de requisição_**

```
{
	"contract_id": <contract_id_aqui>
}
```

**Após aprovar/reprovar contrato é enviado um email para o usuário.**
<br>
**OBS: O envio de e-mail foi implementado apenas em modo de desenvolvimento, para visualizar o e-mail, acesse o link que vai estar no terminal/cmd -> PreviewUrl: Link_aqui**

<br>

<h1>🛠 Tecnologias</h1>

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)

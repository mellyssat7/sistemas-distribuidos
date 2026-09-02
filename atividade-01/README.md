# Atividade 01 — Autenticação e Autorização com NestJS

## Identificação

**Disciplina:** Desenvolvimento de Sistemas Corporativos  
**Curso:** Tecnologia em Sistemas para Internet  
**Atividade:** Encontros 03 e 04  
**Projeto:** `api-atividade-01`

---

## Objetivo

Desenvolver uma API REST com NestJS para praticar os conceitos de **autenticação e autorização**, utilizando Passport, JWT, bcrypt e Guards.

A aplicação permite autenticar usuários, gerar tokens JWT e controlar o acesso às operações de acordo com o papel de cada usuário.

---

## Tecnologias

- NestJS
- TypeScript
- Passport
- passport-local
- passport-jwt
- JWT
- bcrypt
- Docker
- Docker Compose
- Git
- Thunder Client

---

## Estrutura do projeto

```text
src/
├── auth/
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── local-auth.guard.ts
│   │   └── roles.guard.ts
│   └── strategies/
│       ├── jwt.strategy.ts
│       └── local.strategy.ts
│
├── solicitacoes/
│   ├── solicitacoes.controller.ts
│   ├── solicitacoes.module.ts
│   └── solicitacoes.service.ts
│
├── usuarios/
│   ├── usuarios.module.ts
│   └── usuarios.service.ts
│
├── app.module.ts
└── main.ts
Autenticação

O login é realizado através da rota:

POST /auth/login

Exemplo de requisição:

{
  "email": "ana@empresa.com",
  "senha": "123456"
}

Após a validação das credenciais, a API gera um accessToken utilizando JWT.

As senhas dos usuários são armazenadas como hash utilizando bcrypt, não sendo mantidas em texto puro.

Usuários

Os usuários utilizados na atividade são mantidos em memória para fins didáticos.

Usuário	E-mail	Papel
Ana Lima	ana@empresa.com	gestor
Bruno Silva	bruno@empresa.com	solicitante
Carla Costa	carla@empresa.com	auditor

A senha utilizada nos testes é 123456.

JWT

Após o login, o usuário recebe um token JWT.

O token contém informações necessárias para identificar o usuário, como:

sub — identificador do usuário;
email — e-mail;
papel — papel do usuário.

A senha e o hash da senha não são incluídos no token.

O segredo e o tempo de expiração do JWT são configurados por variáveis de ambiente.

Rotas
Login
POST /auth/login

Realiza a autenticação do usuário e retorna um accessToken.

Perfil
GET /auth/perfil

Requer um token JWT válido.

Retorna os dados básicos do usuário autenticado.

Consultar solicitação
GET /solicitacoes/1

A rota exige autenticação e permite os papéis:

gestor
auditor
Aprovar solicitação
PATCH /solicitacoes/1/aprovar

A rota exige autenticação e permite somente o papel:

gestor

A solicitação utilizada na atividade é:

{
  "id": 1,
  "titulo": "Aquisição de notebook",
  "status": "pendente"
}

Após a aprovação:

{
  "id": 1,
  "titulo": "Aquisição de notebook",
  "status": "aprovada"
}
Autorização por papéis

A aplicação utiliza dois Guards em conjunto:

JwtAuthGuard — verifica se o usuário está autenticado;
RolesGuard — verifica se o usuário possui o papel necessário.

Exemplo:

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('gestor', 'auditor')

A autenticação é verificada primeiro. Depois, o papel do usuário é analisado para determinar se ele possui permissão para acessar a rota.

Resultados dos testes

Os testes foram realizados utilizando o Thunder Client.

Teste	Resultado
Login válido	201 Created
Login inválido	401 Unauthorized
Perfil sem token	401 Unauthorized
Ana consulta solicitação	200 OK
Bruno consulta solicitação	403 Forbidden
Carla consulta solicitação	200 OK
Ana aprova solicitação	200 OK
Bruno tenta aprovar	403 Forbidden
Carla tenta aprovar	403 Forbidden
401 Unauthorized

Ocorre quando a identidade do usuário não foi comprovada.

Exemplos:

ausência de token;
token inválido;
token expirado;
credenciais inválidas.
403 Forbidden

Ocorre quando o usuário está autenticado, mas não possui permissão para realizar determinada operação.

Exemplo:

Bruno → solicitante
Rota → exige gestor
Resultado → 403 Forbidden
Docker

A aplicação pode ser executada utilizando Docker Compose.

Para construir e iniciar:

docker compose up --build

A API ficará disponível em:

http://localhost:3000

Para finalizar os containers:

docker compose down
Variáveis de ambiente

O projeto utiliza um arquivo .env para configurar o JWT.

Exemplo:

JWT_SECRET=chave-local-apenas-para-o-laboratorio
JWT_EXPIRES_IN_SECONDS=900

O arquivo .env está incluído no .gitignore e não deve ser versionado.

O arquivo .env.example é disponibilizado como modelo de configuração.

Considerações finais

A atividade permitiu aplicar, de forma prática, os conceitos de autenticação, autorização, JWT, bcrypt e controle de acesso por papéis em uma API desenvolvida com NestJS.

A implementação foi realizada de forma incremental, utilizando Docker para execução da aplicação e Git para registrar a evolução do projeto.
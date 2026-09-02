# Atividade 01 — Autenticação e Autorização com NestJS

**Disciplina:** Desenvolvimento de Sistemas Corporativos
**Curso:** Tecnologia em Sistemas para Internet
**Encontros:** 03 e 04

## Objetivo

Desenvolver uma API REST com NestJS para praticar **autenticação e autorização**, utilizando autenticação local, bcrypt, JWT e controle de acesso por papéis.

## Tecnologias

* NestJS
* TypeScript
* Passport
* JWT
* bcrypt
* Docker e Docker Compose
* Git
* Thunder Client

## Estrutura

```text
src/
├── auth/
│   ├── decorators/
│   ├── guards/
│   └── strategies/
├── solicitacoes/
├── usuarios/
├── app.module.ts
└── main.ts
```

## Usuários

Os usuários são mantidos em memória para fins didáticos.

| Usuário     | E-mail                                        | Papel       |
| ----------- | --------------------------------------------- | ----------- |
| Ana Lima    | [ana@empresa.com](mailto:ana@empresa.com)     | gestor      |
| Bruno Silva | [bruno@empresa.com](mailto:bruno@empresa.com) | solicitante |
| Carla Costa | [carla@empresa.com](mailto:carla@empresa.com) | auditor     |

**Senha dos testes:** `123456`

## Autenticação

O login é realizado pela rota:

```http
POST /auth/login
```

Exemplo:

```json
{
  "email": "ana@empresa.com",
  "senha": "123456"
}
```

Após a validação das credenciais, a API retorna um **token JWT**.

As senhas são armazenadas utilizando **hash com bcrypt**.

## Rotas

### Login

```http
POST /auth/login
```

Realiza a autenticação e gera o token JWT.

### Perfil

```http
GET /auth/perfil
```

Requer um token JWT válido.

### Consultar solicitação

```http
GET /solicitacoes/1
```

Acesso permitido para:

* `gestor`
* `auditor`

### Aprovar solicitação

```http
PATCH /solicitacoes/1/aprovar
```

Acesso permitido somente para:

* `gestor`

Solicitação utilizada nos testes:

```json
{
  "id": 1,
  "titulo": "Aquisição de notebook",
  "status": "pendente"
}
```

Após a aprovação:

```json
{
  "id": 1,
  "titulo": "Aquisição de notebook",
  "status": "aprovada"
}
```

## Autorização

O controle de acesso utiliza dois Guards:

* `JwtAuthGuard` — verifica se o usuário está autenticado;
* `RolesGuard` — verifica se o usuário possui o papel necessário.

Exemplo:

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('gestor', 'auditor')
```

## Testes realizados

| Situação                   | Resultado          |
| -------------------------- | ------------------ |
| Login válido               | `201 Created`      |
| Login inválido             | `401 Unauthorized` |
| Perfil sem token           | `401 Unauthorized` |
| Ana consulta solicitação   | `200 OK`           |
| Bruno consulta solicitação | `403 Forbidden`    |
| Carla consulta solicitação | `200 OK`           |
| Ana aprova solicitação     | `200 OK`           |
| Bruno tenta aprovar        | `403 Forbidden`    |
| Carla tenta aprovar        | `403 Forbidden`    |

**401 Unauthorized:** usuário não autenticado ou credenciais inválidas.

**403 Forbidden:** usuário autenticado, mas sem permissão para realizar a operação.

## Como executar

Com Docker:

```bash
docker compose up --build
```

A API ficará disponível em:

```text
http://localhost:3000
```

Para finalizar:

```bash
docker compose down
```

## Variáveis de ambiente

O projeto utiliza um arquivo `.env` para configurar o JWT:

```text
JWT_SECRET=chave-local-apenas-para-o-laboratorio
JWT_EXPIRES_IN_SECONDS=900
```

O `.env` não é versionado no Git. O arquivo `.env.example` serve como modelo.

## Resultado

A atividade implementa autenticação e autorização em uma API NestJS, com:

* autenticação local;
* hash de senhas com bcrypt;
* geração e validação de JWT;
* autenticação de rotas;
* autorização por papéis;
* controle de acesso com Guards;
* execução com Docker;
* versionamento com Git.

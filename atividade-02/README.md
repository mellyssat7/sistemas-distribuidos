# Atividade 02 — Segurança e Controle de Acesso (Encontro 05)

**Disciplina:** Desenvolvimento de Sistemas Corporativos
**Curso:** Tecnologia em Sistemas para Internet
**Encontros:** 03, 04 e 05

**Estudante:** Melyssa Silva
**Matrícula:** 20251038060022

## Objetivo

Desenvolver uma API REST com NestJS para praticar **segurança e controle de acesso**, incluindo autenticação local, bcrypt, JWT, autorização por papéis e relatório protegido.

## Funcionalidades implementadas

* Autenticação com JWT
* Hash de senhas com bcrypt
* Controle de acesso por papéis (solicitante, gestor, auditor)
* Consulta de perfil autenticado
* Consulta de solicitação (gestor e auditor)
* Relatório de solicitações (gestor e auditor)
* Aprovação de solicitação (somente gestor)
* Configuração JWT por variáveis de ambiente
* Execução com Docker Compose

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
│   │   └── roles.decorator.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── local-auth.guard.ts
│   │   └── roles.guard.ts
│   └── strategies/
│       ├── jwt.strategy.ts
│       └── local.strategy.ts
├── solicitacoes/
│   ├── solicitacoes.controller.ts
│   ├── solicitacoes.module.ts
│   └── solicitacoes.service.ts
├── usuarios/
│   ├── usuarios.module.ts
│   └── usuarios.service.ts
├── app.module.ts
└── main.ts
```

## Usuários

Os usuários são mantidos em memória para fins didáticos.

| Usuário  | E-mail                                        | Papel       |
| -------- | --------------------------------------------- | ----------- |
| Ana Lima | [ana@empresa.com](mailto:ana@empresa.com)     | gestor      |
| Bruno Silva | [bruno@empresa.com](mailto:bruno@empresa.com) | solicitante |
| Carla Costa | [carla@empresa.com](mailto:carla@empresa.com) | auditor     |
| Melyssa  | [melyssa.t@escolar.ifrn.edu.br](mailto:melyssa.t@escolar.ifrn.edu.br) | gestor |
| Silva    | [silva@escolar.ifrn.edu.br](mailto:silva@escolar.ifrn.edu.br) | auditor |

### Contas personalizadas

**Gestor (Melyssa):**
* E-mail: `melyssa.t@escolar.ifrn.edu.br`
* Papel: `gestor`
* Senha: matrícula da estudante

**Auditor (Silva):**
* E-mail: `silva@escolar.ifrn.edu.br`
* Papel: `auditor`
* Senha: matrícula da estudante invertida

As senhas são armazenadas exclusivamente como hashes bcrypt com salt. Nenhum valor em texto puro ou hash é exposto nas respostas da API.

## Autenticação

O login é realizado pela rota:

```http
POST /auth/login
```

Exemplo:

```json
{
  "email": "melyssa.t@escolar.ifrn.edu.br",
  "senha": "20251038060022"
}
```

Após a validação das credenciais, a API retorna um **token JWT**.

Credenciais inválidas retornam `401 Unauthorized`.

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

Requer um token JWT válido. Retorna os dados do usuário autenticado, incluindo o papel, sem expor senha ou hash.

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

### Relatório de solicitações

```http
GET /solicitacoes/relatorio
```

Acesso permitido para:

* `gestor`
* `auditor`

Resposta:

```json
{
  "total": 3,
  "porStatus": {
    "pendente": 2,
    "aprovada": 1
  }
}
```

## Autorização

O controle de acesso utiliza dois Guards:

* `JwtAuthGuard` — verifica se o usuário está autenticado;
* `RolesGuard` — verifica se o usuário possui o papel necessário.

Papéis suportados: `solicitante`, `gestor`, `auditor`.

Exemplo:

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('gestor', 'auditor')
```

## Variáveis de ambiente

O projeto utiliza um arquivo `.env` para configurar o JWT:

```text
JWT_SECRET=chave-local-apenas-para-o-laboratorio
JWT_EXPIRES_IN_SECONDS=900
```

O `.env` não é versionado no Git. O arquivo `.env.example` serve como modelo.

## 401 Unauthorized vs 403 Forbidden

* **401 Unauthorized:** o usuário não foi autenticado ou forneceu credenciais inválidas. O servidor não reconhece quem está fazendo a requisição. O cliente deve se autenticar e tentar novamente.
* **403 Forbidden:** o usuário está autenticado, mas não possui permissão para acessar o recurso solicitado. A identidade é conhecida, mas o acesso é negado.

## Como executar

### Construir e iniciar

```bash
docker compose up --build
```

A API ficará disponível em:

```text
http://localhost:3000
```

### Encerrar

```bash
docker compose down
```

### Verificar/testar a aplicação

1. Realizar login via Thunder Client ou curl:

```bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"melyssa.t@escolar.ifrn.edu.br","senha":"20251038060022"}'
```

2. Utilizar o token retornado para acessar rotas autenticadas:

```bash
curl http://localhost:3000/auth/perfil -H "Authorization: Bearer <token>"
curl http://localhost:3000/solicitacoes/relatorio -H "Authorization: Bearer <token>"
```

3. Verificar que rotas protegidas sem token retornam `401`.
4. Verificar que rotas com token de papel inadequado retornam `403`.

## Testes manuais (Thunder Client)

| # | Teste | Resultado esperado |
| --- | --- | --- |
| 1 | Login auditor com senha incorreta | `401 Unauthorized` |
| 2 | Login auditor com matrícula invertida | `201 Created` + JWT |
| 3 | Perfil com token do auditor | `200 OK`, papel `auditor`, sem senha/hash |
| 4 | Relatório sem token | `401 Unauthorized` |
| 5 | Relatório com token de Bruno | `403 Forbidden` |
| 6 | Relatório com token do auditor | `200 OK` + contagens |
| 7 | Aprovar com token do auditor | `403 Forbidden` |
| 8 | Aprovar com token do gestor | `200 OK` |

## Fontes consultadas

* [NestJS Documentation — Authentication](https://docs.nestjs.com/security/authentication)
* [NestJS Documentation — Authorization](https://docs.nestjs.com/security/authorization)
* [NestJS Documentation — Guards](https://docs.nestjs.com/guards)
* [NestJS Documentation — Decorators](https://docs.nestjs.com/custom-decorators)
* [Passport.js Documentation](https://www.passportjs.org/)
* [bcrypt.js](https://www.npmjs.com/package/bcrypt)
* [Docker Compose Documentation](https://docs.docker.com/compose/)

## Resultado

A atividade implementa segurança e controle de acesso em uma API NestJS, com:

* autenticação local com JWT;
* hash de senhas com bcrypt;
* geração e validação de JWT;
* autenticação de rotas;
* autorização por papéis (solicitante, gestor, auditor);
* controle de acesso com Guards e decorators;
* relatório de solicitações protegido;
* aprovação exclusiva do gestor;
* configuração JWT por variáveis de ambiente;
* execução com Docker;
* versionamento com Git.

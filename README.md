# Logi Flow

API em [NestJS](https://nestjs.com/) para gestão logística, com persistência em PostgreSQL via TypeORM e validação de dados com Zod.

## Stack

- **[NestJS 11](https://nestjs.com/)** — framework
- **[TypeORM](https://typeorm.io/)** + **PostgreSQL** — persistência
- **[nestjs-zod](https://github.com/BenLorantfy/nestjs-zod)** — validação e serialização com Zod
- **[Biome](https://biomejs.dev/)** — lint/format
- **[Vitest](https://vitest.dev/)** — testes

## Pré-requisitos

- Node.js 20+
- Yarn
- PostgreSQL rodando localmente (ou acessível via `DATABASE_URL`)

## Instalação

```bash
yarn install
```

## Configuração

Crie um arquivo `.env` na raiz com a string de conexão do banco:

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/logiflow_hmg
```

> A configuração do `TypeOrmModule` em [src/app.module.ts](src/app.module.ts) ainda está com credenciais fixas (`localhost`/`postgres`/`postgres`) — ajuste conforme seu ambiente.

## Rodando o projeto

```bash
# desenvolvimento com watch
yarn start:dev

# produção
yarn build
yarn start:prod
```

A aplicação sobe por padrão na porta `3000` (ou na porta definida em `PORT`).

## Testes

```bash
yarn test
```

## Lint

```bash
yarn lint
```

## Estrutura do projeto

```
src/
├── main.ts                    # bootstrap da aplicação
├── app.module.ts               # módulo raiz (config, TypeORM, pipes/interceptors globais)
└── customers/
    ├── customer.entity.ts      # entidade TypeORM
    ├── customer.controller.ts  # rotas HTTP
    ├── customer.service.ts     # regras de negócio
    ├── customer.module.ts
    └── dto/
        └── create-customer.dto.ts  # schema Zod de validação
```

## Endpoints

### Customers

| Método | Rota        | Descrição                 |
|--------|-------------|----------------------------|
| POST   | `/customer` | Cria um novo cliente       |

**Body (`POST /customer`)**

```json
{
  "name": "string",
  "email": "email@exemplo.com",
  "phone": "string (opcional)"
}
```

Retorna `409 Conflict` caso o e-mail já esteja cadastrado.

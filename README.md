# Difaal

Backend service for Difaal — a NestJS + Prisma API.

## Repository layout

- difaal-backend/ - NestJS backend (TypeScript)
  - src/ - application source code
  - prisma/ - Prisma schema and migrations
  - docker-compose.yaml - dev database helper
  - .env - environment variables (do NOT commit secrets)
  - package.json - project scripts & dependencies

## Technologies

- TypeScript
- NestJS
- Prisma (PostgreSQL)
- Docker (for local Postgres during development)

## Getting started (local development)

Prerequisites:
- Node.js (v18+ recommended)
- npm
- Docker & Docker Compose (for running Postgres locally)

1. Clone the repository

   git clone https://github.com/sobhanhsa/difaal.git
   cd difaal/difaal-backend

2. Install dependencies

   npm install

3. Configure environment

Create a `.env` file in `difaal-backend/` (or copy from a provided example if available) with the following variables:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/difaal?schema=public"
JWT_SECRET="your_jwt_secret_here"
```

Make sure to replace the password and secret with secure values. Do not commit `.env` to the repository.

4. Start a local Postgres for development

   npm run db:dev:up

This uses `docker compose` to bring up a `dev-db` service defined in `docker-compose.yaml`.

5. Apply Prisma migrations / deploy schema

   npm run prisma:dev:deploy

6. Run the app in development mode

   npm run start:dev

The API will start on the port configured by the application (check `src` or config files for the exact port).

## Useful npm scripts

- `npm run start` — run NestJS (production/dev depending on build)
- `npm run start:dev` — start in watch mode
- `npm run build` — build the project
- `npm run lint` — run and fix ESLint
- `npm run format` — run Prettier
- `npm run test` — run tests
- `npm run db:dev:up` — start development Postgres via Docker Compose
- `npm run db:dev:rm` — remove dev Postgres container
- `npm run db:dev:restart` — restart dev DB and deploy migrations

## Prisma

Prisma is used as the ORM against PostgreSQL. After changing the Prisma schema, create and apply migrations (or use `prisma migrate dev` locally) and run the deploy script above.

## Tests

Unit and e2e tests are configured (Jest). Run with:

   npm run test

## Notes and next steps

- Consider adding a `.env.example` file to the repo (without secrets) to document required environment variables.
- Add documentation for available API endpoints (Swagger/OpenAPI or a dedicated endpoints section).
- Verify production configuration (secrets, database URLs, and Docker setup) before deployment.

## Contributing

Contributions are welcome: open issues or submit pull requests with a clear description of changes and tests when appropriate.

## License

This repository is marked as UNLICENSED in `difaal-backend/package.json`. Confirm and update the license if you intend to publish or distribute the code.

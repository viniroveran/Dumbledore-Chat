# Dumbledore Chat
A scalable realtime chat

## Architecture
___
+ Package Manager
  + [pnpm](https://pnpm.io/installation)
+ Reverse Proxy
  + Nginx
+ Backend
  + NodeJS Typescript
  + Express
  + PrismaORM
  + Redis
  + Redis Pub/Sub
  + Socket.io

+ Frontend
  + NextJS
  + TailwindCSS
  + Auth.js (Google OAuth)

## Running the application
___

### Please note that running in development mode won't start a reverse proxy.

To start the application in development mode, you must follow the steps:
+ Configure environment variables for [backend](/backend/README.md) and [frontend](/frontend/README.md)
+ Run `docker compose up`

By default, the application will run on:
+ Frontend: http://localhost:3000
+ Backend: http://localhost:8000

API Documentation is available at http://localhost:8000/api/docs/v1 (light mode) or http://localhost:8000/api/docs/v2 (dark mode)

## Deploying the application
___

To deploy the application, configure environment variables and then use the provided `docker-compose-prod.yml`. It will start the full stack that the application needs in order to work, including a reverse proxy.
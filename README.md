# Dumbledore Chat
A scalable realtime chat

## Architecture
___
+ Package Manager
  + [pnpm](https://pnpm.io/installation)
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

To start the application, you must follow the steps:
+ Configure environment variables for [backend](/backend/README.md) and [frontend](/frontend/README.md)
+ Run `docker compose up`

By default, the application will run on:
+ Frontend: http://localhost:3000
+ Backend: http://localhost:8000

API Documentation is available at http://localhost:8000/api/docs/v1 (light mode) or http://localhost:8000/api/docs/v2 (dark mode)
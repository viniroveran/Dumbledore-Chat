# Dumbledore Chat Backend
___

## API Documentation
API documentation is available at:
- http://localhost:8000/api/docs/v1 (light mode)
- http://localhost:8000/api/docs/v2 (dark mode)

## Configuring environment variables
Create a `.env` file based on `.env.example`

By default, `.env.example` contains a ready-to-use configuration for using Docker Compose

```
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[db_name]?schema=public"
REDIS_URL="redis://[user]:[password]@[host]:[port]"
PORT=8000
NODE_SWAGGER_DOMAIN="http://localhost:8000"
```
## Running the application

### It is recommended to run using the provided docker-compose.yml
To run the application locally without docker, run:

```
pnpm run dev
```
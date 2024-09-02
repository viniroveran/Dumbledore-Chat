# Dumbledore Chat Frontend
___

## Configuring environment variables
Create a `.env` file based on `.env.example`

To generate AUTH_SECRET, run: `openssl rand -base64 33`

For `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`, you'll need to register an OAuth app in the [Google Cloud dashboard](https://console.cloud.google.com/apis/credentials/consent). For detailed information, visit [Auth.js Documentation](https://authjs.dev/getting-started/authentication/oauth)

```
AUTH_SECRET=  
AUTH_GOOGLE_ID=  
AUTH_GOOGLE_SECRET=  
AUTH_TRUST_HOST=false  

NEXTAUTH_URL="http://localhost:3000"

BACKEND_URL="http://backend:8000"  
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
```

## Running the application

### It is recommended to run using the provided docker-compose.yml
To run the application locally without docker, run:

```
pnpm run dev
```
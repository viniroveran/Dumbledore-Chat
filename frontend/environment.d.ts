declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AUTH_SECRET: string,
            AUTH_GOOGLE_ID: string,
            AUTH_GOOGLE_SECRET: string,
            NEXT_PUBLIC_BACKEND_URL: string,
        }
    }
}

export {};

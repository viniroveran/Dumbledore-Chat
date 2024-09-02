declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            REDIS_URL: string;
            REDIS_HOST: string;
            REDIS_PORT: number;
            REDIS_USER: string;
            REDIS_PASSWORD: string;
        }
    }
}

export {};

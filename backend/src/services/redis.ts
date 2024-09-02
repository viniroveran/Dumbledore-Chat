import {Redis} from "ioredis";

const url = process.env.REDIS_URL || "";

export const redisPub = new Redis(url);
export const redisSub = new Redis(url);
export const redisCache = new Redis(url);
import { Request } from "express";
import { redis } from "../../db/redis";

const createKey = (req: Request, rateLimitId: string) =>{
	const suffix = req.user ? req.user.auth_key : req.ip;

	if (!suffix) throw new Error("No suffix");

	return `rate_limit:${encodeURIComponent(rateLimitId)}:${encodeURIComponent(suffix)}`;
};

export const getRateLimit = async (req: Request, rateLimitId: string): Promise<number | null> => {
	const rateLimitInRedis = await redis.get(createKey(req, rateLimitId));

	if (!rateLimitInRedis) return null;

	return parseInt(rateLimitInRedis, 10);
};

export const setRateLimit = async (req: Request, resetTime: number, rateLimitId: string) => {
	await redis.setex(createKey(req, rateLimitId), resetTime, (1).toString());
};

export const updateRateLimit = async (req: Request, rateLimitId: string) => {
	await redis.incr(createKey(req, rateLimitId));
};

export const getRateLimitReset = async (req: Request, rateLimitId: string) => {
	const ttl = await redis.pttl(createKey(req, rateLimitId));

	let date = new Date(new Date().toUTCString());
	date = new Date(date.getTime() + ttl);

	return { date: Math.ceil(date.getTime() / 1000), retryAfter: ttl / 1000 };
};

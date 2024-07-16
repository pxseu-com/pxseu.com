import Redis from "ioredis";
import { API_HOSTNAME, REDIS_URL } from "../../config";

export const redis = new Redis(REDIS_URL,{
	keyPrefix: `${API_HOSTNAME}:`,
});

redis.on("error", (error) => {
	console.error("REDIS:", error?.message);
});

import Redis from "ioredis";
import { API_HOSTNAME, REDIS_URL } from "../../config";

export const redis = new Redis({
	keyPrefix: `${API_HOSTNAME}:`,
	url: REDIS_URL,
});

redis.on("error", (error) => {
	console.error("REDIS:", error?.message);
});

import { Router } from "express";
import fetch from "node-fetch";
import querystring from "querystring";
// import { redis } from "../../db/redis";
import nowPlaying from "./spotify/nowPlaying";
import topSongs from "./spotify/topSongs";

export const router = Router();

router.get("/nowPlaying", nowPlaying);
router.get("/topSongs", topSongs);

// const CACHE_KEY = "spotify:refresh_token";

export const getAccessToken = async (): Promise<Record<string, unknown>> => {
	// const cached = await redis.getAsync(CACHE_KEY);

	// if (cached) return JSON.parse(cached);

	// TODO: implement caching

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
			client_id: process.env.SPOTIFY_CLIENT_ID,
			client_secret: process.env.SPOTIFY_CLIENT_SECRET,
		}),
	});

	const data = await response.json();

	// await redis.setAsync(CACHE_KEY, data.expires_in / 2, JSON.stringify({ data }));

	return data;
};

import { Router } from "express";
import { HOSTNAME } from "../config";
import { router as v2 } from "./v2";

export const router = Router();

router.use("/v2", v2);

router.get("/health", (_, res) => {
	res.api(200, {
		message: "OK",
		hostname: HOSTNAME,
	});
});

router.use((_, res) => {
	res.api(404, {
		message: "Not Found",
	});
});

import { Router, Request, Response, NextFunction } from "express";
import { Webhook, MessageBuilder } from "webhook-discord";
import rateLimit from "express-rate-limit";
import AuthKeyDb from "./db/models/auth_key";
import { RequestWithUser } from "../express";

const router = Router();
const DEV_MODE = process.env.NODE_ENV == "development";
const NOTE = "pls no api abjus, thank!";

const methodCheck = {
	post: (req: Request, res: Response, next: NextFunction) => {
		const method = req.method;

		if (method != "POST") {
			return res.json({
				error: "Method not allowed!",
			});
		}
		next();
	},
};

const sendMessageLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 1,
	message: {
		status: 429,
		message: `Only one message per minute!`,
	},
});

router.use(require("express").json());

router.use(
	"/v1/sendMessage",
	methodCheck.post,
	async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const body: { message: string; content?: string } = await req.body;

		const AuthKey = req.headers.authorization;

		const apiKeyFound = await AuthKeyDb.findOne({
			auth_key: AuthKey,
		});

		if (body.content != undefined) {
			const message = "Cannot send empty message!";
			return res.status(400).json({
				status: 400,
				message,
				error: message,
				note: NOTE,
			});
		}

		if (body.message == undefined || body.message.trim() == "") {
			const message = "Cannot send empty message!";
			return res.status(400).json({
				status: 400,
				message,
				error: `${message} (please update your API to read the 'message' filed and not 'content')`,
				note: NOTE,
			});
		}

		if (body.message.trim().length > 2048) {
			const message = "Message is too large!";
			return res.status(400).json({
				status: 400,
				message,
				error: `${message} (please update your API to read the message filed)`,
				note: NOTE,
			});
		}

		if (apiKeyFound) {
			req.user = apiKeyFound.toJSON();
			next();
		}

		if (DEV_MODE) {
			next();
			return;
		}

		sendMessageLimiter(req, res, next);
	},
	async (req: RequestWithUser, res: Response) => {
		const currentUser = await req.user;
		const message: string = await req.body.message.trim();
		const Hook = new Webhook(process.env.WEBHOOK ?? "");
		const embed = new MessageBuilder();

		embed.setName("pxseu messenger");
		embed.setAvatar(
			"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512",
		);
		embed.setAuthor(
			"Anonymous",
			"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512",
			"https://www.pxseu.com/other/message",
		);
		embed.setURL("https://www.pxseu.com/other/message");
		embed.setTitle("New Message!");
		embed.setDescription(`Content: \n${message}`);
		embed.setColor("#3399ff");
		embed.setFooter(
			"pls no api abjus, thank!",
			"https://cdn.discordapp.com/avatars/645330135527981069/3440c4def2a42777de2ccafba45adf02.webp?size=512",
		);
		embed.setTime();
		Hook.send(embed);

		const user = currentUser == undefined ? undefined : req.user.user;
		res.json({
			status: 200,
			message,
			note: NOTE,
			user,
		});
	},
);

export default router;

import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Twemoji from "../../components/Twemoji";

const Contact = (): JSX.Element => (
	<DefaultLayout title={"Contact / Socials"}>
		<p>Bellow are a couple of ways you can get in touch with me!</p>
		<p>
			<a href="https://github.com/pxseu" target="_blank" rel="noreferrer">
				<Twemoji emoji="🌐" /> Github
			</a>
		</p>
		<p>
			<a href="https://twitter.com/pxseu" target="_blank" rel="noreferrer">
				<Twemoji emoji="🐦" /> Twitter
			</a>
		</p>
		<p>
			<a href="mailto:me@pxseu.com" target="_blank" rel="noreferrer">
				<Twemoji emoji="📧" /> Email
			</a>
		</p>
		<p>
			<a href="https://discord.pxseu.com" target="_blank" rel="noreferrer">
				<Twemoji emoji="📱" /> Discord
			</a>
		</p>
	</DefaultLayout>
);

export default Contact;

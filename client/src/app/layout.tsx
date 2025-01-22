import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "pxseu.com",
	description: "Find out more about me",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex justify-center items-center bg-zinc-800 text-zinc-100 h-screen">{children}</body>
		</html>
	);
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				brand: {
					100: "#00CCFF",
					500: "#8066F7",
					900: "#FF00EE",
				},
			},
		},
	},
	plugins: [],
};

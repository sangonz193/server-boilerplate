require("@babel/register")({
	presets: [
		[
			"@babel/preset-env",
			{
				targets: { node: 15 },
			},
		],
		"@babel/preset-typescript",
	],
	plugins: ["@babel/plugin-transform-runtime"],
	extensions: [".js", ".ts"],
})

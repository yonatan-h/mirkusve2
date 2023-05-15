const { join } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		"view-selector": "./src/view-selector/view-selector.js",
		background: "./src/background/background.js",
		setup: "./src/setup/setup.js",
	},

	output: {
		path: join(__dirname, "dist"),
		filename: "[name].bundle.js",
	},

	module: {
		rules: [
			{ test: /\.html$/, use: "html-loader" },
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				//relative paths allowed
				{ from: "./src/setup/setup.html", to: "setup.html" },
				{ from: "./src/manifest.json" },
			],
		}),
	],
};

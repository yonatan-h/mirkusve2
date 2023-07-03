const config = require("./webpack.config");
const { merge } = require("webpack-merge");

module.exports = merge(config, {
	mode: "development",
	devtool: "cheap-source-map",
	watch: true,
	watchOptions: {
		ignored: /node_modules/,
	},
});

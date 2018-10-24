const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.(j|t)sx?$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					babelrc: false,
					presets: [
						[
							"@babel/preset-env",
							{
								targets: {
									browsers: "last 1 versions"
								}
							} // or whatever your project requires
						],
						"@babel/preset-typescript",
						"@babel/preset-react"
					],
					plugins: [
						// plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
						["@babel/plugin-proposal-decorators", {
							legacy: true
						}],
						["@babel/plugin-proposal-class-properties", {
							loose: true
						}],
						"react-hot-loader/babel",
					]
				}
			}
		}]
	},
	devServer: {
		contentBase: './dist',
		index: 'index.html',
		port: 8079,
		hot: true
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			'PKG_VERSION': JSON.stringify('dev')
		})
	]
})
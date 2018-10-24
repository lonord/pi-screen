const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const output = 'dist'

module.exports = {
	entry: './src/index.tsx',
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
						}]
					]
				}
			}
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: ['file-loader']
		}, {
			test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
			use: ['file-loader?outputPath=files/']
		}]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.css']
	},
	plugins: [
		new CleanWebpackPlugin([output]),
		new HtmlWebpackPlugin({
			title: 'Pi Screen',
			filename: 'index.html',
			meta: {
				viewport: 'width=device-width,height=device-height,inital-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
			}
		}),
		new ForkTsCheckerWebpackPlugin({
			tslint: true
		})
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, output)
	}
};
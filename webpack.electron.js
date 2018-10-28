const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const output = 'dist_renderer'

const babelRule = {
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
}

const config = {
	entry: [
		'@babel/polyfill',
		'./src/electron.tsx'
	],
	module: {
		rules: [
			babelRule,
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, {
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			}, {
				test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
				use: ['file-loader?outputPath=files/']
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.css']
	},
	target: 'electron-renderer',
	plugins: [
		new CleanWebpackPlugin([output]),
		new HtmlWebpackPlugin({
			title: 'Pi Screen',
			meta: {
				viewport: 'width=device-width,height=device-height,inital-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
			}
		}),
		new ForkTsCheckerWebpackPlugin({
			tslint: true
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, output)
	}
};

if (process.env.NODE_ENV !== 'production') {
	babelRule.use.options.plugins.push("react-hot-loader/babel")
	config.mode = 'development'
	config.devtool = 'inline-source-map'
	config.plugins.push(
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			'PKG_VERSION': JSON.stringify('dev')
		})
	)
	config.devServer = {
		contentBase: './dist',
		index: 'index.html',
		port: 8079,
		hot: true
	}
} else {
	config.mode = 'production'
	config.plugins.push(
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'PKG_VERSION': JSON.stringify('v' + pkg.version)
		})
	)
}

module.exports = config
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const pkg = require('./package.json');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'PKG_VERSION': JSON.stringify('v' + pkg.version)
		})
	]
});
'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = (env) => {
	const config = {
		entry: {
			bootstrap: './src/app.js',
			vendor: './src/vendor.js'
		},
		output: {
			path: path.resolve('dist'),
			filename: `[name].${env.version}.js`
		},
		resolve: {
			extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
		},
		module: {
			loaders: [
				{ 	test: /\.ts?$/, loaders: ['babel-loader', 'ts-loader'],
					exclude: /node_modules/
				},
				{ 	test: /\.js?$/, loaders: ['babel-loader'],
					exclude: /node_modules/
				},
				{ test: /\.html$/, loaders: ['html-loader'] }
			]
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor'
			}),
			new webpack.ProvidePlugin({
				'window.jQuery': 'jquery'
			})
		]
	};

	if (!env.prod) {
		config.devtool = "#inline-source-map";
	}

	return config;
};

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
		],
		devServer: {
			contentBase: path.resolve('dist'),
			open: true,
			quiet: false,
			noInfo: false,
			watchOptions: {
				aggregateTimeout: 300,
				poll: 1000
			},
			proxy: {
				'/api': {
					target: proxyUri,
					secure: false
				}
			}
		}
	};

	if (!env.prod) {
		config.devtool = "#inline-source-map";
	}

	return config;
};
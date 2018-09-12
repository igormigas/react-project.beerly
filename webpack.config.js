//
// WEBPACK.CONFIG.JS
//

// Environment switch
// Must have NODE_ENV set in package.json script
const devMode = process.env.NODE_ENV.trim() !== 'production';
console.log(devMode ? 'DEVELOPMENT' : 'PRODUCTION');

// Paths & directories
const dirDistribution = 'dist/';

// Plugins & optimizers
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");

// Useful modules
//const webpack = require('webpack');
const path = require('path');

//
// Start of config
//
module.exports = {
	mode: 'development',
	devtool: devMode ? 'eval-source-map' : false,
	entry: {
		'index': path.resolve(__dirname, 'src/index.js')
	},
	resolve: {
		// only to use jsx extensions for component files
		extensions: ['*', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					plugins: ['@babel/plugin-proposal-class-properties']
				}
			},
			{
				test: /\.[s]?css$/,
				exclude: path.resolve(__dirname, 'src/styles'),
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true,
    					localIdentName: '[name]_[local]_[hash:base64:5]',
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.[s]?css$/,
				include: path.resolve(__dirname, 'src/styles'),
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, dirDistribution),
		filename: 'scripts/[name].dist.js',
		publicPath: './'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/template.html'),
			filename: path.resolve(__dirname, dirDistribution, 'index.html'),
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
      filename: 'styles/[name].dist.css',
      chunkFilename: 'styles/[id].dist.css',
    })
	],
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({})
		],
		splitChunks: {
			chunks: 'all'
		}
	},
	devServer: {
		port: 3000,
		open: true,
		contentBase: path.resolve(__dirname, dirDistribution),
		historyApiFallback: true,
		publicPath: '/'
	}
}
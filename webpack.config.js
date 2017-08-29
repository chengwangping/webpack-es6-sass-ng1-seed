'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    var config = {};
    //Should be an empty object if it's generating a test build     
    config.entry = {
        app: ['babel-polyfill','./app/app.js']
    };
    config.output = {
        // Absolute output directory
        path: __dirname + '/dist',
        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: isProd ? '/' : 'http://localhost:8080/',
        // Filename for entry points
        // Only adds hash in build mode
        filename: isProd ? 'js/[name].[hash:8].js' : '[name].bundle.js',
        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: isProd ? 'js/[name].[hash:8].js' : '[name].bundle.js'
    };

    //Type of sourcemap to use per build type
   // config.devtool = isProd ? 'cheap-module-source-map' : 'source-map';

    //Loaders - This handles most of the magic responsible for converting modules
    config.module = {
        rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, 
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [
                    { 
                        loader: 'css-loader', query: { sourceMap: true } 
                    },
                    { 
                        loader: 'postcss-loader'
                    }
                ],
            })
        }, 
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: ['css-loader','sass-loader','postcss-loader']
            })
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: 'images/[name].[hash:8].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: 'fonts/[name].[hash:8].[ext]'
            }
        },
        // {
        //     // ASSET LOADER
        //     // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        //     // You can add here any file extension you want to get copied to your output
        //     test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        //     loader: 'file-loader'
        // }, 
        {
            // HTML LOADER
            // Allow loading html through js
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    };



    config.plugins = [
        // Add vendor prefixes to your css
        // NOTE: This is now handled in the `postcss.config.js`
        // webpack2 has some issues, making the config file necessary
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: { 
                postcss: { 
                    plugins: [autoprefixer({
                        browsers: ['last 10 versions', 'ie >= 9'],
                        flexbox:true,
                        remove: false
                    })] 
                }
            }
        }),
        // Render index.html
        new HtmlWebpackPlugin({ template: './app/index.html', inject: 'body' }),
        // Extract css files     
        new ExtractTextPlugin({ 
            filename: 'css/[name].css', 
            disable: !isProd, 
            allChunks: true
        }),
        // Only emit files when there are no errors
        new webpack.NoEmitOnErrorsPlugin(),
        // Minify all javascript, switch loaders to minimizing mode
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            warnings: false,
            mangle: {
                except: ['$q', '$ocLazyLoad']
            },
            sourceMap: true
        }),
        // Copy assets from the assets folder
        new CopyWebpackPlugin([{
            from: __dirname + '/app/assets'
        }]),
        new CopyWebpackPlugin([{
            from: __dirname + '/app/components/menu/menu.html',
            to: __dirname + '/dist/components/menu/menu.html'
        }]),
        new CopyWebpackPlugin([{
            from: __dirname + '/app/components/footer/footer.html',
            to: __dirname + '/dist/components/footer/footer.html'
        }]),
        new CopyWebpackPlugin([{
            from: __dirname + '/app/components/header/header.html',
            to: __dirname + '/dist/components/header/header.html'
        }]),
    ];


    config.devServer = {
        contentBase: './app/',
        //stats: 'minimal',
        open: true,
        port:3001,
        overlay:true,
        inline: true,
        historyApiFallback:true,
        watchOptions: {
            aggregateTimeout: 10,
            poll: 500
        },
    };

    return config;
}();

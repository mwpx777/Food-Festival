const path = require('path');
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const fileLoader = require('file-loader')


module.exports = {
    // these are entry points for all of the js files
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    output: {
        // build will create series of bundled files from entry objects
        // example app.bundle.js, events.bundle.js
        // output bundle files will be written to dist folder
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    module: {
      rules: [
        {
          // regex expression for finding .jpeg files
          test:/\.(png|jpe?g|gif)$/i,
          // this is where the loader is implemented
          use: [
            {
              loader: 'file-loader',
              options: {
                name (file) {
                  return "[path][name].[ext]"
                },
                publicPath: function(url){
                  return url.replace("../", "/assets/")
                }
              }
            },
            {
              loader: 'image-webpack-loader'
            }
          ]
        }
      ]
    },
     plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", //the report outputs to an HTML file in the dist folder
        })
      ],
    mode: 'development'
};
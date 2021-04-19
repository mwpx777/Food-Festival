const path = require('path');
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const fileLoader = require('file-loader')
const WebpackPwaManifest = require('webpack-pwa-manifest');


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
        }),
        // creating new constructor function
        new WebpackPwaManifest({
          name: "Food Event",
          short_name: "Foodies",
          description: "An app that allows you to view upcoming food events.",
          start_url: "../index.html",
          background_color: "#01579b",
          theme_color: "#ffffff",
          fingerprints: false,
          inject: false,
         
          icons: [{
            src: path.resolve("assets/img/icons/icon-512x512.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            // where icons will be sent after creation of web manifest
            destination: path.join("assets", "icons")
        }]
        })
      ],
    mode: 'development'
};
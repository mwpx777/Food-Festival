const path = require('path');
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


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
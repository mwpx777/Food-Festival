const path = require('path');
const webpack = require("webpack");


module.exports = {
    entry: './assets/js/script.js',
    output: {
        // path will add folder to create main.bundle.js
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
     plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
      ],
    mode: 'development'
};
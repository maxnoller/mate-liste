const path = require('path');

module.exports = {
  mode: "development",
  entry: ["babel-polyfill", "./index.js"],
  output: {
    path: path.resolve(__dirname, "../static/frontend/public/"),
    publicPath: "../static/frontend/public/",
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {presets: ["@babel/env"]}
        }
        },
        {
          test: /\.css$/i,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
    ]
  }
};
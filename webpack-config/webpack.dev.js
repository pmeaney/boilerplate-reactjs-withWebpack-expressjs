const path = require("path")
const webpack = require("webpack")
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  entry: {
    'component_modules/initial_dashboard/initial_dashboard': [
      "babel-runtime/regenerator",
      "babel-register",
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/client/InitialDashboard_EntryFile.js"
    ]
  },
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../src/server/public/reactBundles"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "../src/server/public/reactBundles",
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      { // Compile Boostrap4 scss
        test: /\.(s[ac]ss|css)$/,
          use: [
            'style-loader', // dumps css file into style tag
            // MiniCssExtractPlugin.loader,
            'css-loader', // reads css files in
            'sass-loader' // reads sass files in
          ]
      },
        { test:  /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
          loader: 'url-loader?limit=100000'
        }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new Dotenv(),
    // new BundleAnalyzerPlugin() 
  ]
}

// new BundleAnalyzerPlugin({
    //   generateStatsFile: true,
    //   analyzerPort: 3002
    // })
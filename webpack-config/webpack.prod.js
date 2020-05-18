const path = require("path")
const webpack = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const Dotenv = require('dotenv-webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = env => {
  return {
    // target: 'node',
    target: 'web',
    // context: path.resolve(__dirname, '../src/client'),
    entry: {
      // 'component_modules/employee_dashboard/mainExample': [
      //   "./src/client/mainExample.js"
      // ],
      // 'component_modules/employee_dashboard/employee_dashboard': [
      //   "./src/client/EmployeeDashboard_EntryFile.js"
      // ],
      // 'component_modules/admin_dashboard/admin_dashboard': [
      //   "./src/client/AdminDashboard_EntryFile.js"
      // ]
      'component_modules/initial_dashboard/initial_dashboard': [
      // "InitialDashboard_EntryFile.js"
      "./src/client/InitialDashboard_EntryFile.js"
      ]
    },
    mode: "production",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../src/server/public/reactBundles"),
      // publicPath: "/"
      publicPath: "../src/server/public/reactBundles"
    },
    optimization: {
      splitChunks: {
        automaticNameDelimiter: "-",
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "initial",
            minChunks: 2
          }
        }
      },
      minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      // new OptimizeCssAssetsPlugin({})
    ]
    },
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
        {
        // this is to find css files
        test: /\.s?[ac]ss$/,
        // this lets us set up an array of loaders
        use: [
          'style-loader', // dumps css file into style tag
          MiniCssExtractPlugin.loader,
          'css-loader', // reads css files in
          'sass-loader' // reads sass files in
        ]
      }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.s?[ac]ss$/g,
        cssProcessor: require("cssnano"),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(env.NODE_ENV),
          // APP_API_BASE_URL: JSON.stringify(env.APP_API_BASE_URL),
        }
      }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      // new Dotenv()
      // new UglifyJsPlugin(),
      // new CompressionPlugin({
        //   algorithm: "gzip"
        // }),
        // new BrotliPlugin(),
        // new BundleAnalyzerPlugin()
      // new BundleAnalyzerPlugin({
      //   generateStatsFile: true
      // })
    ]
  }
}

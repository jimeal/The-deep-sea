const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const apiMocker = require("connect-api-mocker");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        //loader: 'file-loader', 
        use: [
          'file-loader?name=assets/[name].[ext]?[hash]',
          'image-webpack-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[name].[ext]?[hash]',
            limit: 20000,
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./index.html`,
      title: `The Deep Sea`,
      filename: `index.html`,
      inject: true,
      minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
              } : false,
      //favicon: "favicon.ico",
      hash: true,
      chunks: ['main'],
      meta: [
              {
                  httpEquiv: 'X-UA-Compatible',
                  content: 'IE=edge'
              },
              {
                name: 'viewport',
                content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                //content: "width=device-width, initial-scale=1.0"
              },
              { 
                  name: 'description',
                  content: 'description goes here'
              }
            ],
    }),
    new CopyPlugin([
      { from: 'src/static', to: 'assets' },
    ]),
    // new webpack.BannerPlugin({
    //   banner: `
    //     Build Date: ${new Date().toLocaleString()}
    //     Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
    //     Author: ${childProcess.execSync('git config user.name')}
    //   `
    // }),
    new webpack.DefinePlugin({
      TWO: 1+1,
      THREE: '1+2',
      'api.domain': JSON.stringify('http://dev.api.domain.com')
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({filename: `[name].css`})]
      : []),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    host: "localhost",
    overlay: true,
    //port: 8081,
    stats: "errors-only",
    //historyApiFallback: true
    before: app => {
      app.use(apiMocker('/api', 'mocks/api'));
    },
    hot: true,
    // proxy: {
    //   '/api': "http://localhost:8081"
    // },
  }
}
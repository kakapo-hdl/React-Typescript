const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ACTION_TYPE = process.env.ACTION_TYPE;
const port = 3000
module.exports = {
  // mode: "development",
  entry: {
    app: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.resolve("./src")],
        use: {
          loader: "ts-loader"
        },
        resolve: {
          extensions: [".js", ".jsx", '.ts', '.tsx']
        }
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')]
              }
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [path.resolve("./src/assets/images")],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              esModule: false
            }
          }
        ],
        type: 'javascript/auto'
      },

    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ACTION_TYPE == "serve" ? ['You application is running here http://localhost:' + port] : [],
        // notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      clearConsole: true,
      additionalFormatters: [],
      additionalTransformers: []
    }),
    new WebpackBar({
      color: "#85d",  // ??????green????????????????????????HEX
      basic: false,   // ??????true???????????????????????????????????????
      profile: false,  // ??????false?????????????????????
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CssMinimizerWebpackPlugin()
  ],
  stats: {
    modules: false,
    assets: false,
    entrypoints: false,

    // children: false,
    // chunks: false,
    // chunkModules: false
  },
  // alias:{
  //   '@': path.resolve(__dirname, 'src')
  // },
  devServer: {
    port: port,
    open: true,
    historyApiFallback: { index: "/", disableDotRule: true },
    client: {
      logging: 'error',//???????????????????????????????????????????????????
      overlay: {  //????????????????????????????????????????????????????????????
        errors: true,
        warnings: false,

      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
  },

}
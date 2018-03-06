const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: {
    vendors: ['react', 'react-dom', 'react-leaflet'],
    app: ['./src/app.js']
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'stage-2'],
              plugins: ['transform-runtime']
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
            },
          }],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)(\?.*$|$)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[md5:hash:hex:6]',
        },
      }
    ]
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
    poll: 500,
    ignored: /node_modules/,
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
}


module.exports = config;
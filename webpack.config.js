const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'main': './src/main.js',
    'user': './src/user.js'
  },
  resolve: {
    modules: [
      __dirname + '/src',
      __dirname + '/node_modules'
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/js',
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['main'],
      title: 'Home page',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['user'],
      title: 'User page',
      filename: 'user.html'
    }),
    
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader','babel-loader']
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader','sass-loader']
      }
    ]
  },
};
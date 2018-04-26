module.exports = {
  entry: {
    'main': './src/main.js',
    'user': './src/user.js',
    'admin': './src/admin.js'
  },
  resolve: {
    modules: [
      __dirname + '/src',
      __dirname + '/node_modules'
    ]
  },
  output: {
    path: __dirname + '/../',
    publicPath: '/js',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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
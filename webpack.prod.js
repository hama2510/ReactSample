module.exports = {
  entry: [
    './src/main.js',
    './src/user.js'
  ],
  resolve: {
    modules: [
      __dirname + '/src',
      __dirname + '/node_modules'
    ]
  },
  output: {
    path: __dirname + '/../src/main/webapp/resources/js',
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
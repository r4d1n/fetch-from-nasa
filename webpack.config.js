var webpack = require("webpack")

module.exports = {
  entry: [
    "./javascript/index.js",
  ],
  output: {
    path: './dist/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}

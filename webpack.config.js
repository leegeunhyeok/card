const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/card/' : '/'
  },
  ...(process.env.NODE_ENV !== 'production' ? { devtool: 'source-map' } : null),
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_module/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
       {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              useRelativePath: true
            }
          }
        ]
       }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname)
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      publicPath: process.env.NODE_ENV === 'production' ? '/card/' : '/'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'icons', to: 'icons' },
        { from: 'images', to: 'images' },
        { from: 'splash', to: 'splash' },
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'service-worker.js', to: 'service-worker.js' },
        { from: 'favicon-32x32.png', to: 'favicon-32x32.png' },
        { from: 'favicon.ico', to: 'favicon.ico' }
      ],
    })
  ],
  devServer: {
    port: 9090,
    host: '0.0.0.0',
    inline: true
  }
}

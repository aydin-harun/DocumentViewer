const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback:true,
  },
  module: {
    rules:[
      {
        test:  /\.js$/,
        loader: "babel-loader",
        exclude: /node-modules/
      },
      {
        test:  /\.jsx$/,
        loader: "babel-loader",
        exclude: /node-modules/
      },
      {
        test:  /\.scss$/,
        use: ["style-loader" , "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test:  /\.css$/,
        use: ["style-loader" , "css-loader", "sass-loader"]
      },
      
    ]
  }
};

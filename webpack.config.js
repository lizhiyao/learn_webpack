// webpack 命令会尝试加载当前目录下的 webpack.config.js 文件。

// 如果项目变得越来越大，编译耗时将会越来越长。
// 所以，我们希望能够展示一些进度条，同时增加颜色
// $ webpack --progress --colors

// 我们并不希望每一个变更都需要去手动编译，则可以通过以下命令来改善。
// $ webpack --watch --progress --colors 
// 这样，webpack 会缓存未变更的模块而输出变更的模块。

// 开启 webpack 监控模式后，webpack 会给所有文件添加用于编译的文件监控。
// 如果有任何变更，将会触发编译。
// 当缓存开启时，webpack 会在内存中保存所有模块内容并在没变更时直接重用。
module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css"}
    ]
  }
}
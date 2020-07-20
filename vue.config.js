// vue.config.js

const webpack = require('webpack')

module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: '@import "@/styles/globals.scss";',
      },
    },
  },

  // Try to turn on Lodash shorthands option
    // https://github.com/lodash/lodash-webpack-plugin#feature-sets
    // https://v4.webpack.js.org/plugins/loader-options-plugin
    // https://stackoverflow.com/a/60352961
  // configureWebpack: {
  //   plugins: [
  //     new webpack.LoaderOptionsPlugin({
  //       options: {
  //         config: { lodash: { shorthands: true } }
  //       }
  //     })
  //   ],
  // },

  // plugins: {
  //   lodash: {
  //     config: { lodash: { shorthands: true } },
  //   },
  // },

  publicPath: process.env.NODE_ENV === 'production' ? '/vue-playground/' : '/',
}

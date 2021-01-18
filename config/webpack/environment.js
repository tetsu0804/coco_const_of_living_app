const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)


// environment.config.merge({
//     maxEntrypointSize: 500000
// //    maxAssetSize: 500000,
// })

module.exports = environment

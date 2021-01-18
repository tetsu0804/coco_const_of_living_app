process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

config.public_file_server.enabled=true

module.exports = environment.toWebpackConfig()

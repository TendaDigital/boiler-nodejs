/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

require('dotenv').config()

const path = require('path')
const HOUR = (1000 * 60 * 60)
const ip = require('ip')

// Load config variables and expose.
// Load occurs from:
//  > package.json
//  > process.env

module.exports = async() => {
  let config = {}
  
  config.ENV = getEnv('NODE_ENV', 'dev')
  config.PORT = getEnv('PORT') || getEnv('NODE_PORT', 8011)
  config.HOST = getEnv('HOST', `${ip.address()}:${config.PORT}`)
  config.PROTOCOL = getEnv('PROTOCOL', 'http://')
  config.MONGO_URI = getEnv('MONGO_URI', `mongodb://localhost:27017/torneio-${config.ENV}`)

  // state
  config.isProduction = config.ENV == 'production'
  config.isTest = config.ENV == 'test'
  config.isDev = !config.isProduction && !config.isTest

  // Static assets (dist) configs
  config.distFolder= getEnv('DIST_FOLDER', path.join(__dirname, '../../dist'))
  config.maxAge =  1 * HOUR // 

  return config
}

function getEnv(env, defaults) {
  return process.env[env] || defaults
}

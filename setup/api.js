/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const _ = require('lodash')
const app = require('../app')
const i18n = require('i18n')
const glob = require('glob')
const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')

/*
 * Load routes from api
 */
module.exports = async () => {
  // Default route is to show help
  app.server.all('/', (req, res) => {
    res.send({
      hello: 'Fellow developer!',
    })
  })

  // Create secondary router for '/api/*'
  let api = express()

  // Initialize i18n
  api.use(i18n.init)

  // If delay mode is enabled, inject middleware to slowdown things
  if (app.config.DEBUG_DELAY) {
    api.use((req, res, next) => {
      setTimeout(next, app.config.DEBUG_DELAY * 1)
    })
  }

  // Locate route files from api folder
  let cwd = path.join(__dirname, '../api')
  let routerPaths = glob.sync('**/*route.js', { cwd })

  // Require route files
  let routers = routerPaths.map(file => require(path.join(cwd, file)))

  // user a temporary router to order
  let tmpRoute = express()

  // Install routes
  for (let route of routers) {
    await route(tmpRoute)
  }
  
  // Order routes by path priority
  app.helpers.routes.order(tmpRoute)

  // get ordered router and apply on api
  tmpRoute._router.stack.forEach(function (currentRoute){
    let path = _.get(currentRoute, 'route.path')
    let stack = _.get(currentRoute, 'route.stack', [])
    let method = _.get(currentRoute, 'route.stack[0].method')
    let functions = stack.map(s => s.handle)

    if(method) {
      api[method](path, ...functions)
    }
  })

  tmpRoute = null
  
  // Server errors and Not Found
  api.use('*', app.helpers.middlewares.notFound)
  api.use('*', app.helpers.middlewares.error)

  // Install into `/v1` route
  app.server.use('/v1', api)

  // Fallback
  app.server.use(fallback('index.html', { root: app.config.distFolder }))

  // Return api router
  return api
}

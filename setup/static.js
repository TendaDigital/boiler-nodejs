/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const express = require('express')

/*
 * Serve assets on app.config.DIST_FOLDER
 */
module.exports = async (app) => {
  let static = express.static(app.config.distFolder, {
    maxAge: app.config.maxAge,
  })

  app.server.use(static)
}

/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

/*
 * Generate docs at /docs and bind to router
 */
const fs = require('fs')
const path = require('path')
const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')

module.exports = async (app) => {
  // Load docs
  const options = {
    definition: Object.assign({}, require('../api/docs-v1'), {
      servers: [{
        url: app.config.API_URL + '/v1',
        description: 'Your API'
      }]
    }),

    // Path to the API docs
    apis: [path.join(__dirname, '../**/*.yml')],
  }
  const swaggerSpec = swaggerJSDoc(options)
  fs.writeFileSync(path.join(__dirname, '../docs/api-v1.json'), JSON.stringify(swaggerSpec, null, 2))

  // Serve docs at path
  app.server.use('/v1/docs', express.static(path.join(__dirname, '../docs')))
}

/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const app = require('@/app')

module.exports = (err, req, res, next) => {
  if (!err) {
    return next()
  }

  // Attemp to convert this as a MongoError
  try {
    app.helpers.parse.mongoError(err)
  } catch(e) {
    err = e
  }

  // Gatter error metadata
  let body = app.helpers.parse.error(err, res)

  // Add stack on debug mode
  if (!app.config.isProduction) {
    body.stack = err.stack
  }

  // Apply status to response
  res.status(body.status)

  // Cleanup body if in production
  if (app.config.isProduction && body.status == 500) {
    // Prepare response to user
    body.type = 'FatalError'
    body.error = 'Um erro inesperado aconteceu e foi enviado aos nossos desenvolvedores'
    
    // Report if necessary
  }

  if (!app.config.isProduction && body.status == 500) {
    console.error(err)
  }

  // Send back error
  return res.send(body)
}

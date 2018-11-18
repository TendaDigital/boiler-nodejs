/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

/*
 * Start listening on specified port
 */
module.exports = async (app) => {
  // Bind server to port
  app.server.set('port', app.config.PORT)
  await app.server.listen(app.server.get('port'))
}

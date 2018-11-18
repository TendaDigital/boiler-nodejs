/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const mongoose = require('mongoose')

/*
 * Connects to MongoDB 
 */
module.exports = async (app) => {
  // Set custom promisse library to use
  mongoose.Promise = global.Promise

  let driverOptions = { }

  return await mongoose.createConnection(app.config.MONGO_URI, driverOptions)
}

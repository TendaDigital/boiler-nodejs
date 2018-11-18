/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

/*
 * Load models and register with Mongoose
 */
const mongoose = require('mongoose')
const requireSmart = require('require-smart')

module.exports = async (app) => {
  let schemas = requireSmart('../models', {
    skip: [/\..*\.js$/],
  })

  // Return loaded models
  return await walkModels(app, schemas)
}

// recursively walk into models folders
async function walkModels(app, schemas) {
  let models = {}

  for (let name in schemas) {
    let Schema = schemas[name]

    // check if we are dealing with a schema or a subfolder
    if (Schema instanceof mongoose.Schema) {
      // Load model into mongo connection
      models[name] = app.mongo.model(name, Schema, name)
    } else {
      // Just append to the tree, but don't load it as a Mongoose model
      models[name] = Schema
    }
  }
  
  return models
}
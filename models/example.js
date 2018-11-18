/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const Schema = require('mongoose').Schema

// hold an generic model
module.exports = new Schema({
  model: {
    type: String,
    index: true
  },
  modelId: {
    type: Schema.Types.ObjectId,
    unique: true
  },
  value: Object
})
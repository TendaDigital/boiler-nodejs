/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const requireSmart = require('require-smart')

// Load helpers into app.helper
module.exports = async() => {
  return module.exports = requireSmart('../helpers', {
    skip: [/spec\.js$/],
  })
}
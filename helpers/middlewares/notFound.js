/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const errors = require('../../errors')

module.exports = (req, res, next) => {
  next(new errors.NotFound('route.notFound'))
}
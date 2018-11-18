/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const util = require('util')

module.exports = class BaseError extends Error {
  constructor () {
    // Format message
    let message = util.format(...arguments)

    // Calling parent constructor of base Error class.
    super(message)
    
    // save passed arguments
    this.i18n = [...arguments]

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)
  }
}
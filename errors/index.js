/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const requireSmart = require('require-smart')

module.exports = requireSmart('./', {skip: [/spec\.js$/, /index\.js/]})
/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const app = require('@/app')

module.exports = async(router) => {
  router.get('/status',
    app.helpers.routes.rule(require('./rule.js')),
    app.helpers.routes.func(require('./func.js')))
}
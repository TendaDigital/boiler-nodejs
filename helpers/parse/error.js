/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const _ = require('lodash')

const errors = require('@/errors')

module.exports = (err, res) => {
  const MappingErrors = [
    { status: 400, name: 'BadRequest',    class: errors.BadRequest },
    { status: 401, name: 'Unauthorized',  class: errors.Unauthorized },
    { status: 403, name: 'Forbidden',     class: errors.Forbidden },
    { status: 404, name: 'NotFound',      class: errors.NotFound },
    { status: 409, name: 'Conflict',      class: errors.Conflict },
    { status: 422, name: 'Unprocessable', class: errors.Unprocessable },
  ]

  let errorClass = _.find(MappingErrors, maybe => err instanceof maybe.class)

  // Defaults to FatalError
  errorClass = errorClass || { status: 500, name: 'FatalError' }

  let finalMessage = err.message
  let canTranslate = _.isFunction(res.__) && _.isArray(err.i18n)
  if(canTranslate) {
    finalMessage = res.__(`errors.${err.name}`) + ': ' + res.__mf(...err.i18n)
  }

  let parsed = {
    status: errorClass.status,
    name: errorClass.name,
    type: err.name,
    error: finalMessage,
  }

  return parsed
}

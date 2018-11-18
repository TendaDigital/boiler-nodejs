/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const i18n = require('i18n')
const path = require('path')

// Load helpers into app.helper
module.exports = async() => {
  i18n.configure({
    locales: ['en', 'pt-BR'],
    directory: path.join(__dirname, '../locales'),
    objectNotation: true,
    updateFiles: false,
  })

  return i18n
}
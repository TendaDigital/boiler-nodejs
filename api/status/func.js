/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

module.exports = async(context, res) => {
  return {
    [res.locals.locale]: res.__('hello'),
    date: Date.now()
  }
}
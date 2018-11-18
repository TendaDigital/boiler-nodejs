/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const func = require('./func')
const assert = require('assert')

describe('GET /v1/status', function() {
  it('returns the status of the server', async function () {
    const res = { __ : (s) => s, locals : { locale: 'en' } }
    const resp = await func({}, res)

    assert.equal(resp.en, 'hello')
  })
})
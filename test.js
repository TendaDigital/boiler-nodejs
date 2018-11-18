/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

const glob = require('glob')
const chalk = require('chalk')
const Mocha = require('mocha')

const app = require('./app')

// this function receives another function and test it to see if it's throws the expected error
global.assertFuncThrows = async (expectedError, fun, ...context) => {
  try {
    await fun(...context)
    throw new Error(`Should have thrown ${expectedError}, but succeded`)
  } catch (e) {
    if (e.name != expectedError) {
      throw e
    }
  }
}

async function test() {
  console.info()
  console.info('Bootstrapping basic components...')
  console.info()

  await app.bootstrap(['config', 'i18n', 'helpers', 'mongo', 'models', 'redirect'])

  // Security Checks before starting tests
  if (app.config.MONGO_URI && !app.config.MONGO_URI.includes('localhost') && app.config.isProduction) {
    throw new Error(chalk.red('You cannot test on a non local MongoDB.\n'
      + 'Change MONGO_URI to default localhost before testing')
    )
  }

  let mocha = new Mocha({ timeout: 20000 })

  // Find files for testing
  let testFiles = glob.sync('**/*spec.js', {
    ignore: ['node_modules/**']
  })

  // Add files to mocha
  testFiles.forEach(mocha.addFile.bind(mocha))

  // Default passes to 0, in case there is only syncronous tests running
  let stats = {passes: 0}

  // Run tests and save stats
  stats = mocha.run(function(failures) {
    // Exits if less then 10 tests are being run (in case .only is used)
    if (!failures && stats.passes < 9) {
      console.error(chalk.red('Did not performed full testing:'))
      console.error(chalk.red(' - Remove `describe.only` on tests'))
      console.log()
      return process.exit(1)
    }

    process.exit(!!failures)
  }).stats

  // creating some helpers
  Object.defineProperty(Array.prototype, 'elToString', {
    enumerable: false,
    value: function() { return this.sort().map(s => s.toString()) }
  })
}

process.on('unhandledRejection', (e) => {
  console.error('Unhandled Rejection')
  console.error(e.stack)
  process.exit(1)
})

;(async function (){
  try {
    await test()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
/*!
*   Boilerplate Node.js Express
*   https://github.com/tendadigital
*   Copyright (c) 2016-2018 Tenda Digital
*   Released under the MIT license
*/

// Install tracer (must be the first thing in order to properly work)
require('dotenv').config()

const chalk = require('chalk')

const app = require('./app')

const TAG = '[server]'

// Order of execution for setup steps
const pipeline = [
  // Global configurations
  'config',
  // Load app.helpers
  'helpers',
  // Load mongo
  'mongo',
  // Load models
  'models',
  // Create base express server
  'server',
  // Add redirection behavior
  'redirect',
  // Create web app
  'static',
  // i18n
  'i18n',
  // Generate Docs
  'docs',
  // Create api (/v1) routes and middlewares
  'api',
  // Bind to port and lift http app
  'lift',
]

async function serve(){
  console.info(TAG, chalk.dim('lifting...'))
  
  await app.bootstrap(pipeline)

  console.info(TAG, '          port:', chalk.white(app.config.PORT))
  console.info(TAG, '           env:', chalk.white(app.config.ENV))

  try {
    let mongoUrl = new (require('url').URL)(app.config.MONGO_URI)
    console.info(TAG, '    mongo host:', chalk.white(mongoUrl.hostname))
    console.info(TAG, '    mongo   db:', chalk.white(mongoUrl.pathname))
  } catch (e) {
    console.error(TAG, e.name)
  }

  if (process.env.SHUTDOWN_ON_LIFT)
    process.exit(0)
}

// Listen for Application wide errors
process.on('SIGTERM', shutdown)
process.on('SIGINT' , shutdown)
process.on('unhandledRejection', handleError)
process.on('uncaughtException', handleError)

function shutdown() {
  process.exit(1)
}

function handleError(e) {
  console.error('Fatal Error')
  console.error(e.stack)

  if (app.reporter) {
    console.error('Reporting...')
    app.reporter.report(e, () => {
      console.error('Reported. Exiting.')
      process.exit(1)    
    })
    return
  }
  
  console.error('Exiting.')
  process.exit(1)
}

serve()
var _ = require('lodash')
var errors = require('@/errors')

module.exports = (maybeError) => {
  // Call self recursivelly if in an array
  if (_.isArray(maybeError)) {
    return maybeError.map(module.exports)
  }

  if (maybeError == null || !(maybeError instanceof Error)) {
    return maybeError
  }

  if (maybeError.name == 'ValidationError') {
    throw new errors.BadRequest.InvalidParameter(maybeError.message)
  }

  if(maybeError.code == 11000) {
    let firstSplit = _.get(maybeError.message.split('index: '), '1' , '')
    let secondSplit = _.get(firstSplit.split('dup key'), '0')
    let index = secondSplit.replace(/\s/g,'').split('_').filter(a => a != '1')
    let last = index[index.length - 1]
    throw new errors.Conflict(last)
  }

  throw maybeError
}
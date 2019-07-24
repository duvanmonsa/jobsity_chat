const { inherits } = require('util');

const InvalidArguments = function(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
};
inherits(InvalidArguments, Error);

const BusinessLogicError = function(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
};
inherits(BusinessLogicError, Error);

module.exports = { InvalidArguments, BusinessLogicError };

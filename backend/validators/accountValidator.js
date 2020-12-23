const { isBlank, isEmpty } = require('../utils/assertions');

/**
 * @param {string} username 
 * @param {string} email 
 */
const accountValidator = (username, email) => {
  // check types
  let isValid = true;
  let validationError = {};
  
  // validate username
  if (username === null) {
    isValid = false;
    validationError.username = [ 'username cannot be null' ];
  }

  if (typeof(username) !== 'string') {
    isValid = false;
    validationError.username = [ 'username must be a string' ];
  }

  if (isEmpty(username) || isBlank(username)) {
    isValid = false;
    validationError.username = [ 'username cannot be empty' ];
  }

  // validate email
  if (email === null) {
    isValid = false;
    validationError.email = [ 'email cannot be null' ];
  }

  if (typeof(email) !== 'string') {
    isValid = false;
    validationError.email = [ 'email must be a string' ];
  }

  if (isEmpty(email) || isBlank(email)) {
    isValid = false;
    validationError.email = [ 'email cannot be empty' ];
  }

  return { isValid: isValid, validationError: validationError };
} 

module.exports = { accountValidator };
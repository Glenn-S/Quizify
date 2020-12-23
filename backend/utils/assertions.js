
// String Assertions
/**
 * @param {string} str 
 */
const isEmpty = (str) => {
  return (!str || 0 === str.length);
}

/**
 * @param {string} str 
 */
const isBlank = (str) => {
  return (!str || /^\s*$/.test(str));
}

module.exports = { isEmpty, isBlank };
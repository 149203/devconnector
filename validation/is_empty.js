const is_empty = value =>
   value === undefined ||
   value === null ||
   (Object.keys(value).length === 0 && value.constructor === Object) ||
   (typeof value === 'string' && value.trim().length === 0)

module.exports = is_empty

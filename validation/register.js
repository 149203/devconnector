const validator = require('validator')
const is_empty = require('./is_empty')

module.exports = function validate_register_input(user_input) {
   let errors = {}
   if (!validator.isLength(user_input.name, { min: 2, max: 30 })) {
      // it's not valid (not between 2 and 30 characters)
      errors.name = 'Name must be between 2 and 30 characters.'
   }
   console.log(is_empty(errors))
   return {
      errors, // the errors obj
      isValid: is_empty(errors), // returns true if the errors obj is empty
   }
}

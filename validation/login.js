const validator = require('validator')
const is_empty = require('./is_empty')

module.exports = function validate_login_input(user_input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   user_input.email = is_empty(user_input.email) ? '' : user_input.email
   user_input.password = is_empty(user_input.password)
      ? ''
      : user_input.password

   // These go in order! E.g. the isEmpty validation will overwrite the isEmail validation.

   if (!validator.isEmail(user_input.email)) {
      errors.email = "That's not a valid email."
   }
   if (validator.isEmpty(user_input.email)) {
      errors.email = 'An email is required.'
   }

   if (validator.isEmpty(user_input.password)) {
      errors.password = 'A password is required.'
   }

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}

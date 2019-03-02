const validator = require('validator')
const is_empty = require('./is_empty')

module.exports = function validate_register_input(user_input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   user_input.name = is_empty(user_input.name) ? '' : user_input.name
   user_input.email = is_empty(user_input.email) ? '' : user_input.email
   user_input.password = is_empty(user_input.password)
      ? ''
      : user_input.password
   user_input.password2 = is_empty(user_input.password2)
      ? ''
      : user_input.password2

   // These go in order! E.g. the isEmpty validation will overwrite the isEmail validation.
   if (!validator.isLength(user_input.name, { min: 2, max: 30 })) {
      // it's not valid (not between 2 and 30 characters)
      errors.name = 'Name must be between 2 and 30 characters.'
   }
   if (validator.isEmpty(user_input.name)) {
      errors.name = 'Your name is required.'
   }

   if (!validator.isEmail(user_input.email)) {
      errors.email = "That's not a valid email."
   }
   if (validator.isEmpty(user_input.email)) {
      errors.email = 'An email is required.'
   }

   if (!validator.isLength(user_input.password, { min: 6, max: 100 })) {
      // it's not valid (not between 2 and 30 characters)
      errors.password = 'Your password must be between 6 and 100 characters.'
   }
   if (validator.isEmpty(user_input.password)) {
      errors.password = 'A password is required.'
   }

   if (!validator.equals(user_input.password, user_input.password2)) {
      errors.password2 = "Your password doesn't match."
   }
   if (validator.isEmpty(user_input.password2)) {
      errors.password2 = 'Password confirmation is required.'
   }

   console.log('is_empty return = ', is_empty(errors))
   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}

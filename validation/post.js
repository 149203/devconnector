const validator = require('validator')
const is_empty = require('./is_empty')

module.exports = function validate_post_input(user_input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   user_input.text = is_empty(user_input.text) ? '' : user_input.text

   if (!validator.isLength(user_input.text, { min: 10, max: 300 })) {
      errors.text = 'Post text needs to be between 10 and 300 characters.'
   }

   if (validator.isEmpty(user_input.text)) {
      errors.text = 'Post text is required.'
   }

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}

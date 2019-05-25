const validator = require('validator')
const is_empty = require('./is_empty')

module.exports = function validate_experience_input(user_input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   user_input.school = is_empty(user_input.school) ? '' : user_input.school
   user_input.degree = is_empty(user_input.degree) ? '' : user_input.degree
   user_input.fieldofstudy = is_empty(user_input.fieldofstudy)
      ? ''
      : user_input.fieldofstudy
   user_input.from = is_empty(user_input.from) ? '' : user_input.from

   // These go in order! E.g. the isEmpty validation will overwrite the isEmail validation.

   if (validator.isEmpty(user_input.school)) {
      errors.school = 'School is required.'
   }
   if (validator.isEmpty(user_input.degree)) {
      errors.degree = 'Degree is required.'
   }
   if (validator.isEmpty(user_input.fieldofstudy)) {
      errors.fieldofstudy = 'A field of study is required.'
   }
   if (validator.isEmpty(user_input.from)) {
      errors.from = 'A starting date is required.'
   }

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}

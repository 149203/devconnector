const validator = require('validator')
const is_empty = require('./is_empty')

module.exports = function validate_profile_input(user_input) {
   let errors = {}

   // if the user input is empty, replace with an empty string
   // else use the user's input
   user_input.handle = is_empty(user_input.handle) ? '' : user_input.handle
   user_input.status = is_empty(user_input.status) ? '' : user_input.status
   user_input.skills = is_empty(user_input.skills) ? '' : user_input.skills

   // These go in order! E.g. the isEmpty validation will overwrite the isEmail validation.

   if (!validator.isLength(user_input.handle, { min: 2, max: 40 })) {
      errors.handle = 'Handle needs to be between 2 and 40 characters.'
   }
   if (validator.isEmpty(user_input.handle)) {
      errors.handle = 'Handle is required.'
   }
   if (validator.isEmpty(user_input.status)) {
      errors.status = 'Status is required.'
   }
   if (validator.isEmpty(user_input.skills)) {
      errors.skills = 'Skills are required.'
   }
   if (!is_empty(user_input.website)) {
      if (!validator.isURL(user_input.website)) {
         errors.website = 'Website must be a valid URL.'
      }
   }
   if (!is_empty(user_input.youtube)) {
      if (!validator.isURL(user_input.youtube)) {
         errors.youtube = 'youtube must be a valid URL.'
      }
   }
   if (!is_empty(user_input.twitter)) {
      if (!validator.isURL(user_input.twitter)) {
         errors.twitter = 'twitter must be a valid URL.'
      }
   }
   if (!is_empty(user_input.facebook)) {
      if (!validator.isURL(user_input.facebook)) {
         errors.facebook = 'facebook must be a valid URL.'
      }
   }
   if (!is_empty(user_input.linkedin)) {
      if (!validator.isURL(user_input.linkedin)) {
         errors.linkedin = 'linkedin must be a valid URL.'
      }
   }
   if (!is_empty(user_input.instagram)) {
      if (!validator.isURL(user_input.instagram)) {
         errors.instagram = 'instagram must be a valid URL.'
      }
   }

   return {
      errors, // the errors obj
      is_valid: is_empty(errors), // returns true if the errors obj is empty
   }
}

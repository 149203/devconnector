// deals with user profile information

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const validate_profile_input = require('../../validation/profile')
const validate_experience_input = require('../../validation/experience')
const validate_education_input = require('../../validation/education')
const _filter = require('lodash/filter')

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get(
   '/',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const errors = {}
      Profile.findOne({ user: req.user.id })
         .populate('user', ['name', 'avatar']) // populates this query with the user name and avatar
         // works because of the definition of user in the Profile schema as a referenced MongoID.
         .then(profile => {
            if (!profile) {
               errors.no_profile = 'There is no profile for this user!'
               return res.status(404).json(errors)
            } else res.json(profile)
         })
         .catch(err => res.status(404).json(err))
   }
)

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
   const errors = {}
   Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
         if (!profile) {
            errors.noprofile = 'There is no profile for this user.'
            return res.status(400).json(errors)
         }
         return res.json(profile)
      })
      .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
   const errors = {}
   Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
         if (!profile) {
            errors.noprofile = 'There is no profile for this user.'
            return res.status(400).json(errors)
         }
         return res.json(profile)
      })
      .catch(err => res.status(404).json(err))
})

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
   const errors = {}
   Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
         if (!profiles) {
            errors.noprofile = 'There are no profiles.'
            return res.status(400).json(errors)
         }
         return res.json(profiles)
      })
      .catch(err => res.status(404).json(err))
})

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
   '/',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      // Validate user input
      const { errors, is_valid } = validate_profile_input(req.body)
      if (!is_valid) {
         console.log(errors, is_valid)
         return res.status(400).json(errors)
      }

      const profile_obj = {}
      // If the field exists in the request, add it to the object
      const body = req.body
      profile_obj.user = req.user.id
      if (body.handle) profile_obj.handle = body.handle
      if (body.company) profile_obj.company = body.company
      if (body.website) profile_obj.website = body.website
      if (body.location) profile_obj.location = body.location
      if (body.bio) profile_obj.bio = body.bio
      if (body.status) profile_obj.status = body.status
      if (body.githubusername) profile_obj.githubusername = body.githubusername

      // Skills - split CSV into array
      if (typeof body.skills !== 'undefined') {
         profile_obj.skills = body.skills.split(',')
      }

      // Social
      profile_obj.social = {} // initialize obj to avoid error
      if (body.youtube) profile_obj.social.youtube = body.youtube
      if (body.twitter) profile_obj.social.twitter = body.twitter
      if (body.facebook) profile_obj.social.facebook = body.facebook
      if (body.linkedin) profile_obj.social.linkedin = body.linkedin
      if (body.instagram) profile_obj.social.instagram = body.instagram

      Profile.findOne({ user: req.user.id })
         .then(profile => {
            if (profile) {
               console.log('profile found')
               // Update profile
               Profile.findOneAndUpdate(
                  { user: req.user.id },
                  { $set: profile_obj },
                  { new: true }
               ).then(profile => res.json(profile))
            } else {
               // Create profile
               // Check if handle exists
               Profile.findOne({ handle: profile_obj.handle })
                  .then(profile => {
                     if (profile) {
                        errors.handle = 'That handle already exists'
                        res.status(400).json(errors)
                     } else {
                        console.log(profile_obj)
                        // TODO: WHY ISN'T THIS SAVING MY PROFILE FIELDS?
                        new Profile(profile_obj)
                           .save()
                           .then(profile => {
                              res.json(profile)
                           })
                           .catch(err => res.status(400).json(err))
                     }
                  })
                  .catch(err => res.status(400).json(err))
            }
         })
         .catch(err => res.status(400).json(err))
   }
)

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
   '/experience',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const { errors, is_valid } = validate_experience_input(req.body)
      if (!is_valid) {
         return res.status(400).json(errors)
      }

      const {
         title,
         company,
         location,
         from,
         to,
         current,
         description,
      } = req.body
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            const newExp = {
               title,
               company,
               location,
               from,
               to,
               current,
               description,
            }
            // Add to experience array in the profile
            profile.experience.unshift(newExp) // add to top of array
            // Save and return whole profile
            profile
               .save()
               .then(profile => res.json(profile))
               .catch(err => res.status(400).json(err))
         })
         .catch(err => res.status(400).json(err))
   }
)

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
   '/education',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const { errors, is_valid } = validate_education_input(req.body)
      if (!is_valid) {
         return res.status(400).json(errors)
      }

      const {
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description,
      } = req.body
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            const newEdu = {
               school,
               degree,
               fieldofstudy,
               from,
               to,
               current,
               description,
            }
            // Add to education array in the profile
            profile.education.unshift(newEdu) // add to top of array
            // Save and return whole profile
            profile
               .save()
               .then(profile => res.json(profile))
               .catch(err => res.status(400).json(err))
         })
         .catch(err => res.status(400).json(err))
   }
)

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete an experience object from profile
// @access  Private
router.delete(
   '/experience/:exp_id',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            // remove the experience object with an id of :exp_id from the experience array
            profile.experience = _filter(profile.experience, experience => {
               return String(experience._id) !== req.params.exp_id
            })

            profile
               .save()
               .then(profile => res.json(profile))
               .catch(err => res.status(400).json(err))
         })
         .catch(err => res.status(400).json(err))
   }
)

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete an education object from profile
// @access  Private
router.delete(
   '/education/:edu_id',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            // remove the education object with an id of :edu_id from the education array
            profile.education = _filter(profile.education, education => {
               return String(education._id) !== req.params.edu_id
            })

            profile
               .save()
               .then(profile => res.json(profile))
               .catch(err => res.status(400).json(err))
         })
         .catch(err => res.status(400).json(err))
   }
)

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
   '/',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Profile.findOneAndDelete({ user: req.user.id })
         .then(() => {
            User.findByIdAndDelete(req.user.id)
               .then(() => {
                  return res.json({ success: true })
               })
               .catch(err => res.status(400).json(err))
         })
         .catch(err => res.status(400).json(err))
   }
)

module.exports = router

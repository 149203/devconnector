// deals with user profile information

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const validate_profile_input = require('../../validation/profile')

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get(
   '/',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const errors = {}
      Profile.findOne({ user: req.user.id })
         .then(profile => {
            if (!profile) {
               errors.no_profile = 'There is no profile for this user!'
               return res.status(404).json(errors)
            } else res.json(profile)
         })
         .catch(err => res.status(404).json(err))
   }
)

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

module.exports = router

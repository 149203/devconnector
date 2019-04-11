// deals with user profile information

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const validate_profile_input = require('../../validation/profile')

// @route   GET api/profile/test
// @desc    Tests the profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile works!' }))

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

      // Get all profile fields
      // Create an object
      const profile_fields = {}
      // If the field exists in the request, add it to the object
      const body = req.body
      profile_fields.user = req.user.id
      if (body.handle) profile_fields.handle = body.handle
      if (body.company) profile_fields.company = body.company
      if (body.website) profile_fields.website = body.website
      if (body.location) profile_fields.location = body.location
      if (body.bio) profile_fields.bio = body.bio
      if (body.status) profile_fields.status = body.status
      if (body.githubusername)
         profile_fields.githubusername = body.githubusername

      // Skills - split CSV into array
      if (typeof body.skills !== 'undefined') {
         profile_fields.skills = body.skills.split(',')
      }

      // Social
      profile_fields.social = {} // initialize obj to avoid error
      if (body.youtube) profile_fields.social.youtube = body.youtube
      if (body.twitter) profile_fields.social.twitter = body.twitter
      if (body.facebook) profile_fields.social.facebook = body.facebook
      if (body.linkedin) profile_fields.social.linkedin = body.linkedin
      if (body.instagram) profile_fields.social.instagram = body.instagram

      Profile.findOne({ user: req.user.id }).then(profile => {
         if (profile) {
            // Update profile
            Profile.findOneAndUpdate(
               { user: req.user.id },
               { $set: profile_fields },
               { new: true }
            ).then(profile => res.json(profile))
         } else {
            // Create profile
            // Check if handle exists
            Profile.findOne({ handle: profile_fields.handle }).then(profile => {
               if (profile) {
                  errors.handle = 'That handle already exists'
                  res.status(400).json(errors)
               } else {
                  new Profile(profile_fields).save().then(profile => {
                     res.json(profile)
                  })
               }
            })
         }
      })
   }
)

module.exports = router

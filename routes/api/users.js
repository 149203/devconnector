// deals with user authentication

const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar') // to import user gravatars
const bcrypt = require('bcryptjs') // to encrypt user passwords
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// @route   GET api/users/test
// @desc    Tests the users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users works!' })) // we want our API to serve JSON

// @route   POST api/users/register
// @desc    Registers user
// @access  Public
router.post('/register', (req, res) => {
   // find One is a mongoose method, body is created with body-parser package and setup in server.js
   User.findOne({ email: req.body.email }).then(user => {
      if (user) {
         return res.status(400).json({
            email: 'Email already exists.',
         }) // throw an error: user is already registered
      } else {
         const { name, email, password } = req.body
         const avatar = gravatar.url(email, {
            s: '200', // size: 200px
            r: 'pg', // rating: PG or below
            d: 'mm', // default if not found: mm (a blank gravatar)
         })

         const newUser = new User({
            name,
            email,
            avatar,
            password,
         })

         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               if (err) throw err
               newUser.password = hash
               newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err))
            })
         })
      }
   })
})

// @route   POST api/users/login
// @desc    Login user / Return web token
// @access  Public
router.post('/login', (req, res) => {
   const { email, password } = req.body
   // Find the user by email
   User.findOne({ email }).then(user => {
      // Check email
      if (!user) res.status(404).json({ email: 'User not found' })
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
         if (isMatch) {
            // user email and password matched

            // Create the payload
            const { id, name, avatar } = user
            const payload = { id, name, avatar }

            // Sign the token
            jwt.sign(
               payload,
               keys.jwt_secret,
               { expiresIn: 3600 },
               (err, token) => {
                  res.json({
                     success: true,
                     token: 'Bearer ' + token, // Makes it a Bearer token
                  })
               }
            ) // imported from config file!!
         } else {
            return res.status(400).json({ password: 'Incorrect password' })
         }
      })
   })
})

// @route   GET api/users/current
// @desc    Gets the currently authorized user (who the token belongs to)
// @access  Private
router.get(
   '/current',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const { id, name, avatar, email } = req.user
      res.json({ id, name, avatar, email })
   }
) // we want our API to serve JSON

module.exports = router

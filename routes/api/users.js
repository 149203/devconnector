// deals with user authentication

const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar') // to import user gravatars
const bcrypt = require('bcryptjs') // to encrypt user passwords

// @route   GET api/users/test
// @desc    Tests the users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users works!' })) // we want our API to serve JSON

// @route   GET api/users/register
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

module.exports = router

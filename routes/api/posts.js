// deals with the posts users can create

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../../models/Post')
const validate_post_input = require('../../validation/post')

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
   '/',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      const { errors, is_valid } = validate_post_input(req.body)
      if (!is_valid) {
         return res.status(400).json(errors)
      }

      const { text, name, avatar } = req.body
      const newPost = new Post({
         text,
         name,
         avatar,
         user: req.user.id,
      })
      newPost
         .save()
         .then(post => res.json(post))
         .catch(err => res.status(400).json(err))
   }
)

module.exports = router

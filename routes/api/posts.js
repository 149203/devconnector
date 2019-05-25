// deals with the posts users can create

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const validate_post_input = require('../../validation/post')

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
   const errors = {}
   Post.find()
      .sort({ date: 'desc' })
      .then(posts => {
         if (posts.length === 0) {
            errors.noposts = 'There are no posts.'
            return res.status(400).json(errors)
         }
         return res.json(posts)
      })
      .catch(err => res.status(404).json(err))
})

// @route   GET api/posts/:id
// @desc    Get a post by post ID
// @access  Public
router.get('/:id', (req, res) => {
   const errors = {}
   Post.findById(req.params.id)
      .then(post => {
         if (!post) {
            errors.nopost = 'There is no post by that ID.'
            return res.status(400).json(errors)
         }
         return res.json(post)
      })
      .catch(err => res.status(404).json(err))
})

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

// @route   DELETE api/posts/:id
// @desc    Delete a post by post ID
// @access  Private
router.delete(
   '/:id',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      // Only the user that created the post can delete it.
      Profile.findOne({ user: req.user.id }) // find by the current user
         .then(profile => {
            Post.findById(req.params.id) // find the post in question
               .then(post => {
                  if (String(post.user) !== req.user.id) {
                     return res.status(401).json({
                        // 401 is an unauthorized status
                        notauthorized:
                           'User is not authorized to delete this post.',
                     })
                  }
                  post
                     .delete()
                     .then(() => {
                        return res.json(`Post ${req.params.id} is deleted`)
                     })
                     .catch(err => res.status(400).json(err))
               })
               .catch(err =>
                  res.status(400).json({ postnotfound: 'Post is not found.' })
               )
         })
         .catch(err =>
            res.status(400).json({ usernotfound: 'User is not found.' })
         )
   }
)

module.exports = router

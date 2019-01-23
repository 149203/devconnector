// deals with the posts users can create

const express = require('express')
const router = express.Router()

// @route   GET api/posts/test
// @desc    Tests the posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts works!' })) // we want our API to serve JSON

module.exports = router

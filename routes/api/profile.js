// deals with user profile information

const express = require("express");
const router = express.Router();

// @route   GET api/profile/test
// @desc    Tests the profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile works!" })); // we want our API to serve JSON

module.exports = router;

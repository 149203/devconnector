// deals with user authentication

const express = require("express");
const router = express.Router();

// @route   GET api/users/test
// @desc    Tests the users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works!" })); // we want our API to serve JSON

module.exports = router;

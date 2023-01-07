const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
const { check, validationResult } = require("express-validator");
// @route GET api/auth
// @desc Test route
// @access Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    ); /* removing password from response we get from MongoDB Query */
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc  Authenticate User
// @access Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or  more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // destructuring req body
    try {
      //1) See if user exists
      let user = await User.findOne({ email: email }); // this function returns promise so we added async before (req,res) and in find one we write the paramter on which we want our search
      if (!user) {
        // If user does not exists
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //2) Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.send(500).send("Server error");
    }
  }
);

module.exports = router;

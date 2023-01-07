const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
const { check, validationResult } = require("express-validator");
// @route POST api/users
// @desc  Register user
// @access Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
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

    const { name, email, password } = req.body; // destructuring req body
    try {
      //1) See if user exists
      let user = await User.findOne({ email: email }); // this function returns promise so we added async before (req,res) and in find one we write the paramter on which we want our search
      if (user) {
        // If user already exists
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      //2) Get user gravatar
      //If user doesn't exists grab its gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg",
        d: "mm", // default image
      });

      user = new User({
        // creating user object if doesn't exists
        name,
        email,
        avatar,
        password,
      });

      //3) Encrypt password and saving to MongoDB
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save(); // saving data to MongoDB

      //4) Return jsonwebtoken
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

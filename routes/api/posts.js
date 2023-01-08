const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");

// @route POST api/posts
// @desc Create Post
// @access Private

router.post(
  "/",
  [auth, check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findOne({ _id: req.user.id }).select("-password");
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = new Post(newPost);
      post.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.send(500).send("Server error");
    }
  }
);

// @route GET api/posts
// @desc Get all Posts
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //get latest post
    return res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.send(500).send("Server error");
  }
});

// @route GET api/posts/:id
// @desc Get Posts by Id
// @access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" }); // length is same but doesn't exist
    }
    return res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Invalid Post Id" }); //For invalid length
    }
    res.send(500).send("Server error");
  }
});

// @route DELETE api/posts/:id
// @desc Delete Posts by Id
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check user is authorized to delete post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorized" });
    }
    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Invalid Post Id" }); //For invalid length
    }
    res.send(500).send("Server error");
  }
});
module.exports = router;

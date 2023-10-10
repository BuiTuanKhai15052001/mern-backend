const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const createError = require("http-errors");
const User = require("../models/User");
const postController = require("../controllers/postController");

//@route POST api/posts
//@desc READ post
//@access private

router.get("/", verifyAccessToken, postController.getAllPost);

//@route PUT api/posts
//@desc UPDATE post
//@access private

router.put("/:id", verifyAccessToken, postController.updatePost);

//@route POST api/posts
//@desc Create post
//@access private

router.post("/", verifyAccessToken, postController.createPost);

//@route DELETE api/posts
//@desc DELETE post
//@access private

router.delete("/:id", verifyAccessToken, postController.deletePost);

module.exports = router;

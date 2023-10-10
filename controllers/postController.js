const Post = require("../models/Post");
const createError = require("http-errors");
const User = require("../models/User");


const getAllPost = async(req, res, next) => {
    try {
        const posts = await Post.find({ user: req.payload.userId }).populate('user', ['username']);
        console.log(posts);

        if (posts.length == 0) {
            throw createError.NotFound('Post not founnd')
        }
        return res.send({
            success: "true",
            posts: posts
        })

    } catch (error) {
        next(error)
    }
}

const updatePost = async(req, res, next) => {
    try {
        const { title, description, url, status } = req.body;
    
        console.log(title);
    
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Title is require",
          });
        }
    
        //   console.log(url);
        if (url != undefined) {
          var urlCheck = url.startsWith("https://") ? url : `https://${url}`;
        }
        //     console.log(req.payload);
        let updatePost = {
          title,
          description: description || "",
          url: urlCheck || "",
          status: status || "TO LEARN",
        };
        const postUpdateCondition = {
          _id: req.params.id,
          user: req.payload.userId,
        };
        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
          new: true,
        });
        if (!updatePost) {
          throw createError.NotFound("Posts not update");
        }
        return res.send({
          success: true,
          message: "Update success!!!!",
          updatePost,
        });
      } catch (error) {
        next(error);
      }
}

const createPost = async(req, res, next) => {
    try {
        const { title, description, url, status } = req.body;
        console.log(title);
        console.log(req.headers);
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Title is require",
          });
        }
    
        const urlCheck = url.startsWith("https://") ? url : `https://${url}`;
        console.log(urlCheck);
        //     console.log(req.payload);
    
        const newPost = new Post({
          title,
          description,
          url: urlCheck,
          status: status || "TO LEARN",
          user: req.payload.userId,
        });
        const savePost = await newPost.save();
    
        return res.send({
          success: true,
          message: `Happy learning ${newPost.title}`,
          post: savePost,
        });
      } catch (error) {
        next(error);
      }
}

const deletePost = async(req, res, next) => {
    try {
        const deletePostCondition = {
          _id: req.params.id,
          user: req.payload.userId,
        };
        const deletePost = await Post.findOneAndDelete(deletePostCondition);
        if (!deletePost) {
          throw createError.NotFound("Posts not delete");
        }
        return res.send({
          success: true,
          message: "Delete success!!!",
          deletePost,
        });
      } catch (error) {
        next(error);
      }
}
module.exports = {
    getAllPost,
    updatePost,
    createPost,
    deletePost
}
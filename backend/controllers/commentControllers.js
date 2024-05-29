import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await Post.findOne({ slug });

    if (!post) {
      let error = new Error("Post not found");
      return next(error);
    }

    const newComment = new Comment({
      desc,
      post: post._id,
      parent,
      replyOnUser,
      user: req.user._id
    });

    const savedComment = await newComment.save();

    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

export { createComment };

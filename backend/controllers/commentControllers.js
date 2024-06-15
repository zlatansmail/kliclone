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
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser
    });

    const savedComment = await newComment.save();
    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { desc } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      let error = new Error("Comment not found");
      return next(error);
    }
    comment.desc = desc || comment.desc;

    const updatedComment = await comment.save();
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    await Comment.deleteMany({ parent: comment._id });

    if (!comment) {
      let error = new Error("Comment not found");
      return next(error);
    }

    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.desc = {
        $regex: filter,
        $options: "i"
      };
    }
    let query = Comment.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * pageSize;
    const total = await Comment.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages)
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"]
        },
        {
          path: "parent",
          populate: [
            {
              path: "user",
              select: ["avatar", "name", "verified"]
            }
          ]
        },
        {
          path: "replyOnUser",
          select: ["avatar", "name", "verified"]
        },
        {
          path: "post",
          select: ["title", "slug"]
        }
      ])
      .sort({ createdAt: "desc" });

    return res.json(result);
  } catch {
    let error = new Error("Comment not found");
    return next(error);
  }
};

export { createComment, updateComment, deleteComment, getAllComments };

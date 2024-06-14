import { parse, v4 as uuidv4 } from "uuid";

import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import Post from "../models/Post.js";
import { fileRemover } from "../utils/fileRemover.js";
import Comment from "../models/Comment.js";

const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: []
      },
      photo: "",
      user: req.user._id
    });

    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      let err = new Error("Post not found");
      err.statusCode = 404;
      next(err);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;

      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async (err) => {
      if (err) {
        const error = new Error("Greska pri slanju slike" + err.message);
        next(error);
      } else {
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          handleUpdatePostData(req.body.document);
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          handleUpdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      let error = new Error("Post not found");
      return next(error);
    }

    await Comment.deleteMany({ post: post._id });

    return res.json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const posts = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"]
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"]
          },
          {
            path: "replies",
            match: {
              check: true
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"]
              }
            ]
          }
        ]
      }
    ]);

    if (!posts) {
      let error = new Error("Post not found");
      return next(error);
    }

    return res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.title = {
        $regex: filter,
        $options: "i"
      };
    }
    let query = Post.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * pageSize;
    const total = await Post.find(where).countDocuments();
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
          select: ["avatar", "name"]
        },
        {
          path: "comments",
          match: {
            check: true,
            parent: null
          },
          populate: [
            {
              path: "user",
              select: ["avatar", "name"]
            },
            {
              path: "replies",
              match: {
                check: true
              },
              populate: [
                {
                  path: "user",
                  select: ["avatar", "name"]
                }
              ]
            }
          ]
        }
      ])
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch {
    let error = new Error("Posts not found");
    return next(error);
  }
};

export { createPost, updatePost, deletePost, getPost, getAllPosts };

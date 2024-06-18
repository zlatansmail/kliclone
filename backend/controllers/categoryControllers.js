import PostCategories from "../models/PostCategories.js";
import Post from "../models/Post.js";

export const createCategory = async (req, res, next) => {
  try {
    let { title, parent, slug, color } = req.body;
    parent = parent === "" ? null : parent;

    const categoryExists = await PostCategories.findOne({ slug });

    if (categoryExists) {
      const error = new Error("Kategorija već postoji");
      return next(error);
    }

    const newCategory = new PostCategories({
      title,
      slug,
      parent,
      color
    });

    const savedCategory = await newCategory.save();

    return res.json(savedCategory);
  } catch (error) {
    next(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { title, slug, color, parent } = req.body;
    const category = await PostCategories.findByIdAndUpdate(
      req.params.categoryId,
      { title, slug, color, parent },
      { new: true }
    );

    if (!category) {
      const error = new Error("Kategorija nije pronađena");
      return next(error);
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.title = {
        $regex: filter,
        $options: "i"
      };
    }
    let query = PostCategories.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * pageSize;
    const total = await PostCategories.find(where).countDocuments();
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
          path: "parent",
          select: ["title"]
        }
      ])
      .sort({ createdAt: "desc" });

    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await PostCategories.findById(req.params.categoryId);
    const categoryId = req.params.categoryId;
    await Post.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    );

    if (!category) {
      const error = new Error("Kategorija nije pronađena");
      next(error);
      return;
    }

    await PostCategories.deleteOne({ _id: categoryId });

    res.status(200).send({ message: "Kategorija uspješno obrisana" });
  } catch (error) {
    next(error);
    return;
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await PostCategories.findById(req.params.categoryId);

    if (!category) {
      const error = new Error("Kategorija nije pronađena");
      return next(error);
    }

    return res.json(category);
  } catch (error) {
    next(error);
    return;
  }
};

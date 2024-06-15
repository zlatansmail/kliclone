import PostCategories from "../models/PostCategories.js";
import Post from "../models/Post.js";

export const createCategory = async (req, res, next) => {
  try {
    const { title, slug, parent, color } = req.body;

    const category = await PostCategories.findOne({ title });
    if (category) {
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

    res.status(201).json(savedCategory);
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
    const categories = await PostCategories.find();
    res.status(200).json(categories);
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

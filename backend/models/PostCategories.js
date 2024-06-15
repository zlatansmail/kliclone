import { Schema, model } from "mongoose";

const PostCategoriesSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    color: { type: String, default: "rgb(75,85,99)" },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "PostCategories",
      default: null
    }
  },
  { timestamps: true }
);

const PostCategories = model("PostCategories", PostCategoriesSchema);

export default PostCategories;

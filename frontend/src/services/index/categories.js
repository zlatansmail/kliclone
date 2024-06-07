import axios from "axios";

export const getCategories = async () => {
  try {
    const { data } = await axios.get("/api/categories");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

import axios from "axios";

const getAllPosts = async () => {
    try {
      const { data } = await axios.post("/api/posts");
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  };

  export {getAllPosts};
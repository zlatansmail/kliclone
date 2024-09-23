import axios from "axios";

const getAllPosts = async (searchKeyword = "", page = 1, limit = 100) => {
  try {
    const { data, headers } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

const getPostsByCategory = async (category = "", page = 1, limit = 15) => {
  try {
    const { data, headers } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/posts?category=${category}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/posts/${slug}`
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const deletePost = async ({ token, slug }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/posts/${slug}`,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const updatePost = async ({ updatedData, token, slug }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/posts/${slug}`,
      updatedData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const createPost = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      {},
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export {
  getAllPosts,
  getSinglePost,
  deletePost,
  updatePost,
  createPost,
  getPostsByCategory
};

import axios from "axios";

const createNewComment = async ({ token, desc, slug, parent, replyOnUser }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/comments`,
      {
        desc,
        slug,
        parent,
        replyOnUser
      },
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

const updateComment = async ({ token, desc, check, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/comments/${commentId}`,
      {
        desc,
        check
      },
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

const deleteComment = async ({ token, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${commentId}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

const getAllComments = async (
  token,
  searchKeyword = "",
  page = 1,
  limit = 10
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data, headers } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/comments?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
      config
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export { createNewComment, updateComment, deleteComment, getAllComments };

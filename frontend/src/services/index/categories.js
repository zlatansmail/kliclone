import axios from "axios";

export const getAllCategories = async (
  searchKeyword = "",
  page = 1,
  limit = 100
) => {
  try {
    const { data, headers } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/categories?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteCategory = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/categories/${slug}`, config);

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const createCategory = async ({ token, title, parent, color, slug }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/categories`,
      {
        title,
        parent,
        color,
        slug
      },
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

export const updateCategory = async ({ token, title, parent, color, slug, categoryId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/categories/${categoryId}`,
      {
        title,
        parent,
        color,
        slug
      },
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

export const getCategory = async (slug) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

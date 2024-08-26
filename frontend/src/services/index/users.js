import axios from "axios";

const signUp = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      name,
      email,
      password
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const logIn = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
      email,
      password
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const updateProfile = async ({ token, userData, userId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/users/updateProfile/${userId}`,
      userData,
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

const updateProfilePicture = async ({ token, formData }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/users/updateProfilePicture`,
      formData,
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

const getAllUsers = async (token, searchKeyword = "", page = 1, limit = 10) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data, headers } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
      config
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

const deleteUser = async ({ token, slug }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export {
  signUp,
  logIn,
  getUserProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteUser
};

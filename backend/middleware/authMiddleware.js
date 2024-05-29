import jwt from "jsonwebtoken";

import User from "../models/User.js";

const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let err = new Error("Not authorized");
    err.statusCode = 401;
    next(err);
  }
};

const adminGuard = async (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let err = new Error("Not authorized as an admin");
    err.statusCode = 401;
    next(err);
  }
};

export { authGuard, adminGuard };

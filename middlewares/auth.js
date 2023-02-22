const { User } = require("../models");
const { Unauthorized } = require("http-errors");
// const { HttpError } = require("../helpers");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  //   console.log(authorization);
  const [bearer, token] = authorization.split(" ");
  //   console.log(token);
  if (bearer !== "Bearer") {
    throw new Unauthorized();
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // console.log(id);
    const user = await User.findById(id);
    // console.log(user);
    if (!user || !user.token) {
      throw new Unauthorized();
    }

    req.user = user;
    // console.log(req.user);
    next();
  } catch (error) {
    // console.log(error);
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;

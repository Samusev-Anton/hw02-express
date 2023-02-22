const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

// const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // if (!user) {
  //   throw new Unauthorized(`Email ${email} not found`);
  // }
  // const passwordCompare = bcrypt.compareSync(password, user.password);
  // if (passwordCompare) {
  //   throw new Unauthorized(`Wrong password!`);
  // }
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized();
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
  const result = await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = signIn;

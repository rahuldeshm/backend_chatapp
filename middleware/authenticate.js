const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = (req, res, next) => {
  const token = req.headers.token;
  try {
    const userId = jwt.verify(token, process.env.TOKEN_KEY);
    User.findByPk(userId.id)
      .then((user) => {
        req.user = user;
        console.log(">>>>>> authorised");
        next();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("bad request, token");
    res.status(405).json({ err: "INVALID TOKEN" });
  }
};

module.exports = authenticate;

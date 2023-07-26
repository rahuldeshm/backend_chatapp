const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isStringInvalid(string) {
  if (string == undefined || string.length == 0) {
    return true;
  } else {
    return false;
  }
}

exports.signup = (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;
    if (
      isStringInvalid(email) ||
      isStringInvalid(password) ||
      isStringInvalid(phone) ||
      isStringInvalid(username)
    ) {
      return res
        .status(400)
        .json({ message: "bad request. something is missing" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          throw err;
        }
        try {
          const result = await User.create({
            username,
            email,
            phone,
            password: hash,
          });

          const token = jwt.sign(
            { id: result.id, username: result.username },
            process.env.TOKEN_KEY
          );

          res.json({
            message: "Login Successful",
            userame: result.username,
            email: req.body.email,
            phone: result.phone,
            token: token,
          });
        } catch (err) {
          res.status(403).json({ message: "Email already Present" });
        }
      });
    }
  } catch (err) {
    res.status(403).json({ message: "Unknown error occured in backend" });
  }
};

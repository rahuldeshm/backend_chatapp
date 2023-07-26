const Message = require("../models/message");

exports.newmessage = async (req, res, next) => {
  try {
    const resp = await Message.create({
      userId: req.user.id,
      text: req.body.msg,
    });
    res.status(201).json({ userId: resp.userId, msg: resp.text, id: resp.id });
  } catch (err) {
    console.log("some error occured");
    res.status(402).json({ message: "SOME ERROR OCCURED" });
  }
};

exports.getmessages = (req, res, next) => {
  console.log(req.body, ">>>>get message route");
};

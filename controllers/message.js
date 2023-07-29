const Message = require("../models/message");
const User = require("../models/user");

exports.newmessage = async (req, res, next) => {
  try {
    const resp = await Message.create({
      userId: req.user.id,
      groupId: req.body.groupId,
      msg: req.body.msg,
    });
    res.status(201).json(resp);
  } catch (err) {
    console.log("some error occured");
    res.status(402).json({ message: "SOME ERROR OCCURED" });
  }
};

exports.getmessages = async (req, res, next) => {
  try {
    const resp = await Message.findAll({
      where: { groupId: req.params.id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(resp);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "UNABLE TO FETCH" });
  }
};

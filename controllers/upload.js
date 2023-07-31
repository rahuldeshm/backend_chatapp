const S3Services = require("../services/S3services");
const Message = require("../models/message");

exports.newmessagefile = async (req, res, next) => {
  console.log(req.body);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const filename = `${req.body.groupId}${
      req.user.username
    }${new Date()}.${req.file.originalname.slice(-4)}`;
    const fileUrl = await S3Services.uploadtoS3(req.file.buffer, filename);

    const resp = await Message.create({
      userId: req.user.id,
      groupId: req.body.groupId,
      msg: req.body.msg,
      url: fileUrl,
    });
    res.status(201).json(resp);
  } catch (err) {
    console.log(err);
    res.status(500).json({ fileUrl: "", success: false, err: err });
  }
};

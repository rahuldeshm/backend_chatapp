const Group = require("../models/group");
const User = require("../models/user");

exports.addGroup = async (req, res, next) => {
  try {
    const newGroup = await Group.create({
      name: req.body.name,
    });
    const r = await newGroup.addUsers([req.user.id, ...req.body.userId]);
    res.status(201).json({ name: req.body.name, id: newGroup.id });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    const resp = await User.findAll();
    const data = resp.map((e) => {
      return {
        username: e.username,
        email: e.email,
        id: e.id,
      };
    });
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};
exports.fetchGroup = async (req, res, next) => {
  try {
    const resp = await req.user.getGroups();
    res.status(201).json(resp);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};

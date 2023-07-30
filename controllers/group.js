const Group = require("../models/group");
const User = require("../models/user");
const Usergroup = require("../models/usergroup");

exports.addGroup = async (req, res, next) => {
  try {
    const newGroup = await Group.create({
      name: req.body.name,
      createdBy: req.user.id,
    });
    await Usergroup.create({
      groupId: newGroup.id,
      userId: req.user.id,
      isAdmin: true,
    });
    for (const user of req.body.userId) {
      try {
        await Usergroup.create({
          groupId: newGroup.id,
          userId: user.id,
          isAdmin: user.isAdmin,
        });
      } catch (err) {
        console.log(err);
      }
    }
    res.status(201).json({ name: req.body.name, id: newGroup.id });
  } catch (err) {
    console.log(err);
    res.status(402).json({ message: "SOME ERROR OCCURED ON SERVER" });
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
    res.status(403).json({ message: "SOME ERROR OCCURED ON SERVER" });
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

exports.getGroupusers = async (req, res, ne) => {
  try {
    const resp = await Group.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
      ],
    });
    res.status(200).json(resp);
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};
exports.leaveGroup = async (req, res, ne) => {
  try {
    const resp = await Usergroup.destroy({
      where: { userId: req.user.id, groupId: req.params.id },
    });
    res.status(200).json(resp);
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};
exports.addUsers = async (req, res, next) => {
  try {
    for (const user of req.body.userId) {
      try {
        await Usergroup.create({
          groupId: req.body.groupId,
          userId: user.id,
          isAdmin: user.isAdmin,
        });
      } catch (err) {
        console.log(err);
      }
    }
    res.status(201).json({ message: "SUCCESS" });
  } catch (err) {
    console.log(err);
    res.status(402).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};
exports.changeGroupname = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.body.groupId);
    if (group) {
      group.name = req.body.name;
      await group.save();
      res.status(201).json({ message: "SUCCESS" });
    } else {
      throw new Error("GROUP NOT FOUND");
    }
  } catch (err) {
    console.log(err);
    res.status(402).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};
exports.removeUsers = async (req, res, next) => {
  try {
    for (const user of req.body.userId) {
      console.log(user);
      try {
        await Usergroup.destroy({
          where: {
            groupId: req.body.groupId,
            userId: user.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    res.status(201).json({ message: "SUCCESS" });
  } catch (err) {
    console.log(err);
    res.status(402).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};
exports.editAdmins = async (req, res, next) => {
  try {
    for (const user of req.body.userId) {
      try {
        const usergr = await Usergroup.findOne({
          where: {
            groupId: req.body.groupId,
            userId: user.id,
          },
        });
        console.log(user.isAdmin);
        usergr.isAdmin = user.isAdmin;
        usergr.save();
      } catch (err) {
        console.log(err);
      }
    }
    res.status(201).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(402).json({ message: "SOME ERROR OCCURED ON SERVER" });
  }
};

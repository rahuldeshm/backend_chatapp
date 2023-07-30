const sequelize = require("../util/db");
const Sequelize = require("sequelize");

const Usergroup = sequelize.define("usergroup", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Usergroup;

const sequelize = require("../util/db");
const Sequelize = require("sequelize");

const Group = sequelize.define("group", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  createdBy: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Group;

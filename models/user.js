const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;

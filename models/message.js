const sequelize = require("../util/db");
const Sequelize = require("sequelize");

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Message;

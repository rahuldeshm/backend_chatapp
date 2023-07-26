const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const sequelize = require("./util/db");

const app = express();

app.use(bodyParser.json({ extended: true }));

app.use("/auth", authRoutes);

app.listen(3000);

sequelize.sync().then(() => {
  app.listen(4000);
});

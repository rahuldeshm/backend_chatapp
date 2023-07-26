const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const sequelize = require("./util/db");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.json({ extended: true }));

app.use("/auth", authRoutes);

sequelize.sync().then(() => {
  app.listen(3001);
});

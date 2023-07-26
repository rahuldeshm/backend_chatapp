const bodyParser = require("body-parser");
const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json({ extended: true }));

app.use("/auth", authRoutes);

app.listen(3000);

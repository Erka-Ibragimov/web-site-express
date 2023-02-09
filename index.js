require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 7000;
const sequelize = require("./db.js");
const models = require("./models/model.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();

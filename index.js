require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 7000;
const sequelize = require("./db.js");
const models = require("./models/model.js");
const fileUpLoad = require("express-fileupload");
const app = express();
const router = require("./routes/index.js");
const { checkError } = require("./middleware/errors");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpLoad({}));
app.use("/api", router);
app.use(checkError);

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

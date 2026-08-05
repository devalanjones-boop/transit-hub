let mongoose = require("mongoose");
require("dotenv").config();

function mongodbConnect() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
}

module.exports = mongodbConnect;

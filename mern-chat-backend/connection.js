const mongoose = require("mongoose");
require("dotenv").config();

if (mongoose.connections[0].readyState) {
  console.log("Already connected");
  return;
}
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.yivgl.mongodb.net/chatAppMern?retryWrites=true&w=majority`,
  (err) => {
    if (err) throw err;
    console.log("connected to mongodb");
  }
);

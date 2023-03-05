require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const port = process.env.EXPRESS_PORT || 3000;

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_STR)
  .then(() => console.log("Connected Mongo"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Express running on port ${port}`);
});

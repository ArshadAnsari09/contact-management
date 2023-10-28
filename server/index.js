const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { addUser, fetchAllUser } = require("./controller/User");
const app = express();

//env config
dotenv.config();

app.use(express.json());

//connecting mongoDB database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log("Error while connecting database: ", err);
  });

app.use("/api/user/add", addUser);
app.use("/api/users/all", fetchAllUser);
app.use("/", (req, res) => {
  res.send("App backend!");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

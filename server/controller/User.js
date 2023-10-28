const User = require("../model/User");
const moment = require("moment");
exports.addUser = async (req, res) => {
  //   const user = {
  //     name: "arjun",
  //     mobileNumber: "9622578965",
  //     tags: ["demo", "demo2"],
  //   };
  //extracting data from client request
  const data = req.body;
  // console.log(data);

  //user created at
  data.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  data.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
  data.dateOfBilling = moment().format("YYYY-MM-DD");

  //creating new contact using data
  const newUser = new User(data);
  //   console.log(newUser);

  //saving new user
  try {
    await newUser.save();
    res.json({ success: true, message: "User saved successfully" });
  } catch (err) {
    console.error("Error while adding user: ", err);
    res
      .status(400)
      .json({ success: false, message: "Error while saving user" });
  }
};

exports.fetchAllUser = async (req, res) => {
  //handling error
  try {
    //fetching all users from database
    const users = await User.find();
    // console.log(users);
    //no user found
    if (!users) {
      //failure
      console.log("No user found!");
      res.json({ success: false, message: "No user found!" });
    }
    //users found
    res.json({ success: true, message: "All users fetched!", data: users });
  } catch (err) {
    //error
    console.log("Error while fetching users: ", err);
    res.json({ success: false, message: "Error while fetching user!" });
  }
};

const bcryptjs = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//MODELS
const User = require("../models/user");

router.post("/createAccount", async (request, response) => {
  //get user inputs
  // const firstName = request.body.firstName ;
  const { firstName, lastName, email, password, mobile } = request.body;
  //Check if user exists
  User.findOne({ email: email })
    .then(async (account) => {
      if (account) {
        // when we use a new function on the (then & catch) the inner fucntion must be async function too wich means that the indder
        // function doent know that the parent function is an async one
        return response.status(200).json({
          message: "User is already exist",
        });
      } else {
        //Crypt password
        const formatted_passwords = await bcryptjs.hash(password, 10); //the number is how much you want to salt the hash
        //Generate passcode
        const passcode = randomInteger(1000, 9999);

        //Create user in MongoDB
        const _user = new User({
          _id: mongoose.Types.ObjectId(),
          email: email,
          password: formatted_passwords,
          mobile: mobile,
          firstName: firstName,
          lastName: lastName,
          passcode: passcode,
        });
        _user.save().then((account_created) => {
          return response.status(200).json({
            message: account_created,
          });
        });
      }
    })
    .catch((err) => {
      return response.status(500).json({
        message: err,
      });
    });
});

router.post('/login',async(request,response)=>{});

router.post('/verify',async(request,response)=>{
  //Get passcode and email
  //


});

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

router.get("/sayHello", async (request, response) => {
  try {
    const user = await User.find();
    return response.status(200).json({
      message: users,
    });
  } catch (error) {
    return response.status(500).json({
      message: err,
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../model/schema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "thisIsSecretkey";

router.get("/", () => {});

router.post(
  "/register",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password is too short add min 4 charaters").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // in case request params meet the validation criteria
      return res.status(500).json({ error: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      const findUser = await User.findOne({ email: email });

      if (findUser) {
        console.log(findUser);
        console.log("user exists");
        return res
          .status(500)
          .json({ error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      let user = new User({
        name,
        email,
        password: newPassword,
      });

      user = await user.save();

      const data = {
        user:{
            id:user.id
        }
      }
      console.log(data);

      const authToken =  jwt.sign(data,secretKey);
      res.json({authToken})
    } catch (err) {
      console.log(err);
    }
  }
);

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password is too short add min 4 charaters").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // in case request params meet the validation criteria
      return res.status(500).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const findUser = await User.findOne({ email: email });

      if (findUser) {
        console.log(findUser);

        const comparePassword = await bcrypt.compare(
          password,
          findUser.password
        );

        console.log(comparePassword + " password matching");
        if (!comparePassword) {
          return res
            .status(401)
            .json({ error: "email and password are not correct" });
        }
      }
      const data = {
        user:{
            id:findUser.id
        }
      }
      const authToken =  jwt.sign(data,secretKey);
      res.json({authToken,findUser})

    } catch (error) {
      return res.status(500).json({ error: "internal error finding user" });
    }
  }
);

module.exports = router;

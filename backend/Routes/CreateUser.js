const express = require("express");
const router = express.Router();
const User = require("../medels/User");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "IamDC";
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassWord = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassWord,
        email: req.body.email,
        location: req.body.location,
      })
        // .then
        // res.json({ success: true });
        // const authToken = jwt.sign(data, jwtSecret);
        // success = true;
        // res.json({ success, authToken });

        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, jwtSecret);
          success = true;
          res.json({ success, authToken });
        })
        .catch((err) => {
          console.log(err);
          res.json({ error: "Please enter a unique value." });
        });
    } catch (err) {
      res.json({ success: false });
      console.log(err);
    }
  }
);

// **********************************
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try Login with correct credintials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try Login with correct credintials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;

// **************************8

// router.post(
//   "/loginuser",
//   [
//     body("email").isEmail(),
//     body("password", "Incorrect Password").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success, errors: errors.array() });
//     }
//     let email = req.body.email;

//     try {
//       let userData = await User.findOne({ email });

//       if (!userData) {
//         return res
//           .status(400)
//           .json({ errors: "Try Login with correct credintials" });
//       }

//       if (req.body.password !== userData.password) {
//         return res
//           .status(400)
//           .json({ errors: "Try Login with correct credintials" });
//       }

//       res.json({ success: true });
//     } catch (err) {
//       console.log(err);
//       res.json({ success: false });
//     }
//   }
// );

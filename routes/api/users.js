const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");

// validate inputs function
const validateRegistrationInput = require("./../../validatation/registration");

// mongoose user model
const User = require("../../models/User");

// @route GET /api/users/register
// desc   register user
// Access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);
  // check for validation
  let data = {};
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      data.message = "Email already exist Loggin in";
      data.user = user;
      res.status(200).json(data);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      // New user object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar
      });
      newUser
        .save()
        .then(usr => {
           res.status(200).json(usr);
        })
        .catch(err => console.log(err));
    }
  });
});

router.get("/", (req, res) => {
  User.find()
  .then(user => res.json(user))
})
router.get("/login/:id", (req, res) => {
  const id = req.params.id;
  User.find()
    .then(usr => {
      if ((Object.keys(usr).length) >= 1) {
        if (String(id) === String(0)) {
          return res.status(200).json(usr[0])
        }
        if (String(id) === String(1)) {
          if ((Object.keys(usr).length) > 1) {
            return res.status(200).json(usr[1])
          }
        }
        if (String(id) === String(2)) {
          if ((Object.keys(usr).length) > 2) {
            return res.status(200).json(usr[2])
          }
        }
      }

      res.status(404).json({ User: "User is not present" })
    })
    .catch(err => res.status(404).json(err));
});
module.exports = router;

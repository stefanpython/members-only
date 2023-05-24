var express = require("express");
var router = express.Router();
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const users_controller = require("../controllers/userController");
const messages_controller = require("../controllers/messageController");
const membership_controller = require("../controllers/membershipController");
const Message = require("../models/Message");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    const messages = await Message.find()
      .populate("author")
      .sort({ timestamp: -1 })
      .exec();
    res.render("index", {
      title: "Members Only",
      user: req.user,
      messages: messages,
    });
  })
);

// GET/POST user sign-up page
router.get("/sign-up", users_controller.sign_up_get);
router.post("/sign-up", users_controller.sing_up_post);

// GET/POST user membership page
router.get("/membership", membership_controller.join_club_get);
router.post("/membership", membership_controller.join_club_post);

// GET/POST ON CREATE MESSAGE FORM
router.get("/new-message", messages_controller.new_message_get);
router.post("/new-message", messages_controller.new_message_post);

// GET/POST ON DELETE MESSAGE FORM
router.get("/message/:id/delete", messages_controller.message_delete_get);
router.post("/message/:id/delete", messages_controller.message_delete_post);

// LOG IN GET
router.get("/log-in", (req, res) => {
  const errors = validationResult(req);
  res.render("login", {
    title: "Login",
    errors: errors.array(),
    user: req.user,
  });
});

// LOG IN POST
router.post("/log-in", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        title: "Login",
        errors: [{ message: "Incorrect email or password" }],
        user: req.user,
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Authentication succeeded, redirect to a success page
      return res.redirect("/");
    });
  })(req, res, next);
});

// LOG OUT
router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;

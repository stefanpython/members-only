const User = require("../models/User");
const Message = require("../models/Message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const he = require("he");

// Display message form on GET
exports.new_message_get = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  res.render("new-message", { errors: errors.array(), user: req.user });
});

// Handle message form on POST
exports.new_message_post = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title must not be empty")
    .isLength(3)
    .withMessage("Title must be at least 3 characters long")
    .escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Title must not be empty")
    .isLength(3)
    .withMessage("Title must be at least 3 characters long")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Error, re-render the form displaying error
      res.render("new-message", {
        errors: errors.array(),
      });
    } else {
      const { title, content } = req.body;
      const userID = req.user.id;
      const decodedTitle = he.decode(title);
      const decodedContent = he.decode(content);

      // Retrieve user from the database
      const userAuthor = await User.findById(userID).exec();

      // Create new message
      const message = new Message({
        title: decodedTitle,
        content: decodedContent,
        author: userAuthor,
      });

      // Add message to the user`s array
      const user = await User.findById(userID).exec();
      if (Array.isArray(user.message)) {
        user.message.push(message);
      } else {
        user.message = [message]; // If message is not an array, create a new array with the current message
      }
      await user.save();

      const resutl = await message.save();
      res.redirect("/");
    }
  }),
];

// Display message delete form on GET
exports.message_delete_get = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Handle validation errors
    return res.render("message-delete-form", {
      errors: errors.array(),
      user: req.user,
    });
  }

  const message = await Message.findById(req.params.id).populate("author");

  if (!message) {
    const error = new Error("Message not found");
    error.status = 404;
    throw error;
  }

  res.render("message-delete-form", {
    message,
    errors: errors.array(),
    user: req.user,
  });
});

// Handle message delete on POST
exports.message_delete_post = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Handle validation errors
    return res.render("message-delete-form", { errors: errors.array() });
  } else {
    // Delete the message
    await Message.findByIdAndRemove(req.params.id);

    // Redirect to homepage
    res.redirect("/");
  }
});

const User = require("../models/User");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");

// Display sign-up page form on GET
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  res.render("sign-up", { errors: errors.array(), user: req.user });
});

// Handle sing-up page form on POST
exports.sing_up_post = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Fist name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long")
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isLength({ min: 3 })
    .withMessage("Email must be at least 3 characters long")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Email must be at least 3 characters long")
    .escape(),
  body("confirm")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    // Validate confirmation password
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  body("isAdmin").toBoolean(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Render the sign-up form with error messages
      return res.render("sign-up", { errors: errors.array() });
    } else {
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        // User with the same email already exists
        const error = new Error("User with this email already exists");
        return res.render("sign-up", { errors: [{ msg: error.message }] });
      }

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcryptjs.hash(req.body.password, 10),
        isAdmin: req.body.isAdmin || false,
      });

      const result = await user.save();
      res.redirect("/");
    }
  }),
];

const { validationResult } = require("express-validator");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

// GET controller for the join club page
exports.join_club_get = (req, res) => {
  const errors = validationResult(req);
  res.render("membership", { errors: errors.array(), user: req.user });
};

// POST controller to handle the join club form submission
exports.join_club_post = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Render the join club page with error messages
    return res.render("membership", { errors: errors.array() });
  } else {
    const passcode = req.body.passcode;

    // Check if the passcode is correct
    if (passcode === process.env.CLUB_CODE) {
      // Update the user's membership status
      const user = await User.findById(req.user._id);

      if (user) {
        user.membership_status = "VIP Member";
        await user.save();

        return res.redirect("/"); // Redirect to the home page or a success page
      }
    }
    // Invalid passcode
    return res.render("membership", {
      errors: [{ msg: "Invalid passcode" }],
      user: req.user,
    });
  }
});

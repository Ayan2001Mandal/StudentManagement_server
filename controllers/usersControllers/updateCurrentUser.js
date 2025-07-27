const User = require('../../models/userModels');
const bcrypt = require('bcryptjs');

const updateCurrentUser = async (req, res) => {
  try {    
    const userId = req.user._id; // Get the user ID from the authenticated user
    const { fname, lname, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Update fields only if changed
    if (fname) user.fname = fname;
    if (lname) user.lname = lname;
    if (email) user.email = email;

    // If password is provided and not placeholder
    if (password && password !== "********") {
      const isSame = await bcrypt.compare(password, user.password);
      if (!isSame) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
    }

    await user.save();

    // Avoid returning the password in response
    const { password: pwd, ...userData } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500)
    .json({ 
      success: false, 
      message: "Error updating profile", 
      error: error.message });
  }
};

module.exports = updateCurrentUser;

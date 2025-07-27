const User = require('../../models/userModels'); // Adjust path if needed


const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id; // Set by authMiddleware
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(
        {
            success: true,
            message: "Current user fetched successfully",
            user:user,
        });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

module.exports =  getCurrentUser ;

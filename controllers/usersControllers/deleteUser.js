const User = require('../../models/userModels');

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;

    // Only allow if user is admin or the user is deleting their own account
    if (loggedInUser.role !== 'admin' && loggedInUser._id.toString() !== id) {
  return res.status(403).json({ message: 'Access denied. You can only deactivate your own account.' });
}

    const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deactivated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user', error });
  }
};

module.exports = DeleteUser;

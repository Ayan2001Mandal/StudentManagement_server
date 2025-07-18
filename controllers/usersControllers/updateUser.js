const User = require('../../models/userModels');
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Extract the current user's role (set in authMiddleware)
    const currentUserRole = req.user.role;

    // List of fields that are allowed to be updated
    const allowedFields = ['fname', 'lname', 'isActive'];

    // Only allow 'role' update if the logged-in user is admin
    if (currentUserRole === 'admin') {
      allowedFields.push('role');
    } else if ('role' in req.body) {
      // Reject role update explicitly if user is not admin
      return res.status(403).json({ message: 'You are not allowed to update the role field' });
    }

    // Filter the body to only allowed fields
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // If no valid field is present
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

module.exports = updateUser;
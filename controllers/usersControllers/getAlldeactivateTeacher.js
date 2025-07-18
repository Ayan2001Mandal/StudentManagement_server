const User = require('../../models/userModels');

const getDeactivatedTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher', isActive: false })
      .select('-password -isActive')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deactivated teachers', error });
  }
};

module.exports = getDeactivatedTeachers;

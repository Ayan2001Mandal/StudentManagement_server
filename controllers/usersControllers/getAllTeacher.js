const User = require('../../models/userModels');

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher', isActive: true })
      .select('-password -isActive')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error });
  }
};

module.exports = getAllTeachers;

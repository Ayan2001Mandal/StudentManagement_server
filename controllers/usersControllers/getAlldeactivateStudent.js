const User = require('../../models/userModels');

const getDeactivatedStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student', isActive: false })
      .select('-password -isActive')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deactivated students', error });
  }
};

module.exports = getDeactivatedStudents;

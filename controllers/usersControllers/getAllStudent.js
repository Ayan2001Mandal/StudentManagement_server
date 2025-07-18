const User = require('../../models/userModels');

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student', isActive: true })
      .select('-password -isActive')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

module.exports = getAllStudents;

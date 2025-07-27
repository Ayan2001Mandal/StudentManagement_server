const Submission = require('../../models/submissionModel');

const getGradesByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;


    const submissions = await Submission.find({ assignmentId, grade: { $ne: null } })
      .populate('studentId', 'fname lname email')
      .sort({ gradedAt: -1 });

    const formatted = submissions.map((sub) => ({
      student: {
        name: `${sub.studentId.fname} ${sub.studentId.lname}`,
        email: sub.studentId.email
      },
      marks: sub.grade,
      feedback: sub.feedback,
      gradedAt: sub.gradedAt
    }));

    res.status(200).json({
      success: true,
      assignmentId,
      submissions: formatted
    });
  } catch (error) {
    console.error('Error fetching grades:', error);
    res.status(500).json({ error: 'Failed to fetch grades' });
  }
};

module.exports = getGradesByAssignment;

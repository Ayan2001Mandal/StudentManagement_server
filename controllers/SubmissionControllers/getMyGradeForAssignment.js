const Submission = require('../../models/submissionModel');

const getMyGradeForAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const studentId = req.user._id; 


    const submission = await Submission.findOne({
      assignmentId,
      studentId,
    });

    if (!submission) {
      return res.status(404).json({ message: 'Grade not found yet. You may not have submitted or it is not graded.' });
    }

    res.status(200).json({
      success: true,
      assignmentId,
      grade: submission.grade,
      feedback: submission.feedback,
      gradedAt: submission.gradedAt
    });

  } catch (error) {
    console.error('Error fetching student grade:', error);
    res.status(500).json({ error: 'Failed to fetch your grade' });
  }
};

module.exports = getMyGradeForAssignment;

const mongoose = require('mongoose');
const Submission = require('../../models/submissionModel');


const gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;
    const teacherId = req.user._id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
      return res.status(400).json({ error: 'Invalid submission ID format' });
    }

    // Find the submission
    const submission = await Submission.findById(submissionId).populate('assignmentId');
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Check if the logged-in user is the creator of the assignment
    if (submission.assignmentId.createdBy.toString() !== teacherId.toString()) {
      return res.status(403).json({ error: 'You are not authorized to grade this submission' });
    }

    // Update submission with grade and feedback
    submission.grade = grade;
    submission.feedback = feedback;
    submission.gradedBy = teacherId;
    submission.gradedAt = new Date();

    await submission.save();

    res.status(200).json({
      message: 'Submission graded successfully',
      submission: {
        _id: submission._id,
        grade: submission.grade,
        feedback: submission.feedback,
        gradedAt: submission.gradedAt
      }
    });
  } catch (error) {
    console.error('Error grading submission:', error);
    res.status(500).json({ error: 'Server error while grading submission' });
  }
};

module.exports = gradeSubmission;

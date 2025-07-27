const mongoose = require('mongoose');
const Submission = require('../../models/submissionModel');

const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignmentObjectId = new mongoose.Types.ObjectId(id);

    const submissions = await Submission.find({ assignmentId: assignmentObjectId })
      .populate('studentId', 'fname lname email')
      .sort({ submittedAt: 1 });

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    console.error('Error getting submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions.' });
  }
};

module.exports = getSubmissionsByAssignment;

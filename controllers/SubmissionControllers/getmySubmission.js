const Submission = require('../../models/submissionModel');

const getMySubmissions = async (req, res) => {
  try {
    const studentId = req.user._id;

    const submissions = await Submission.find({ studentId })
      .populate('assignmentId', 'title dueDate')
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Server error while fetching submissions.' });
  }
};

module.exports = getMySubmissions;

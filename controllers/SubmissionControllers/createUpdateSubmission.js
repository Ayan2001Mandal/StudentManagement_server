const Submission = require('../../models/submissionModel');
const Assignment = require('../../models/assignmentModel');

const createUpdateSubmission = async (req, res) => {
  try {
    const { assignmentId } = req.body;
    const studentId = req.user._id;

    if (!assignmentId || !req.file) {
      return res.status(400).json({ error: 'Assignment ID and file are required.' });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found.' });
    }

    const now = new Date();
    const dueDate = new Date(assignment.dueDate);

    const existingSubmission = await Submission.findOne({ assignmentId, studentId });

    if (existingSubmission) {
      if (now > dueDate) {
        return res.status(400).json({ error: 'Deadline passed. Cannot resubmit.' });
      }

      existingSubmission.fileUrl = req.file.path;
      existingSubmission.submittedAt = now;
      existingSubmission.status = 'Submitted';
      await existingSubmission.save();

      return res.status(200).json({
        message: 'Resubmission successful.',
        submission: existingSubmission
      });
    }

    const isLate = now > dueDate;

    const submission = await Submission.create({
      assignmentId,
      studentId,
      fileUrl: req.file.path,
      submittedAt: now,
      status: isLate ? 'Late' : 'Submitted'
    });

    return res.status(201).json({
      success: true,
      message: 'Submission successful.',
      submission
    });

  } catch (error) {
    console.error('Submission Error:', error);
    res.status(500).json({ error: 'Server error while submitting assignment.' });
  }
};

module.exports = createUpdateSubmission ;

const mongoose = require('mongoose');
const Assignment = require('../../models/assignmentModel');
const Submission = require('../../models/submissionModel'); 

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid assignment ID format'
      });
    }

    // Check if assignment exists
    const assignmentExists = await Assignment.findById(id);
    if (!assignmentExists) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    // Authorization check and delete
    const deletedAssignment = await Assignment.findOneAndDelete({
      _id: id,
      createdBy: userId
    });

    if (!deletedAssignment) {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to delete this assignment'
      });
    }

    // Delete all related submissions
    await Submission.deleteMany({ assignmentId: id });

    res.status(200).json({
      success: true,
      message: 'Assignment and its submissions deleted successfully',
      data: {
        id: deletedAssignment._id,
        title: deletedAssignment.title
      }
    });

  } catch (err) {
    console.error('Delete assignment error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = deleteAssignment;

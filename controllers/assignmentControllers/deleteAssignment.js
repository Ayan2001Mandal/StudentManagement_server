const mongoose = require('mongoose');
const Assignment = require('../../models/assignmentModel');

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    console.log(`Attempting to delete assignment ${id} by user ${userId}`); // Debug log

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid ID format:', id); // Debug log
      return res.status(400).json({
        success: false,
        error: 'Invalid assignment ID format'
      });
    }

    // First check if assignment exists (without authorization check)
    const assignmentExists = await Assignment.findById(id);
    if (!assignmentExists) {
      console.log('Assignment not found:', id); // Debug log
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    // Then verify authorization and delete
    const deletedAssignment = await Assignment.findOneAndDelete({
      _id: id,
      createdBy: userId
    });

    if (!deletedAssignment) {
      console.log('Authorization failed - User:', userId, 'Assignment creator:', assignmentExists.createdBy); // Debug log
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to delete this assignment'
      });
    }

    console.log('Successfully deleted assignment:', deletedAssignment._id); // Debug log
    res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully',
      data: {
        id: deletedAssignment._id,
        title: deletedAssignment.title
      }
    });

  } catch (err) {
    console.error('Delete assignment error:', err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = deleteAssignment;
const Assignment = require('../../models/assignmentModel');

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid assignment ID'
      });
    }

    // Find and delete the assignment
    const deletedAssignment = await Assignment.findOneAndDelete({
      _id: id,
      createdBy: req.user._id // Ensure only the creator can delete
    });

    if (!deletedAssignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found or you are not authorized to delete it'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully',
      data: {
        id: deletedAssignment._id,
        title: deletedAssignment.title
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = deleteAssignment;
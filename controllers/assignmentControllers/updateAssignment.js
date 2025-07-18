const mongoose = require('mongoose');
const Assignment = require('../../models/assignmentModel');

const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    const userId = req.user._id;


    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid assignment ID' });
    }

    // Find the assignment
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ success: false, error: 'Assignment not found' });
    }

    // Check ownership
    if (assignment.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, error: 'You are not authorized to update this assignment' });
    }

    // Update fields
    if (title) assignment.title = title;
    if (description) assignment.description = description;
    if (dueDate) {
      const due = new Date(dueDate.trim());
      const now = new Date();
      if (due <= now) {
        return res.status(400).json({ error: 'Due date must be in the future' });
      }
      assignment.dueDate = due;
    }

    // Update file if uploaded
    if (req.file) {
      assignment.attachedFileUrl = req.file.path;
    }

    await assignment.save();

    res.status(200).json({
      success: true,
      message: 'Assignment updated successfully!',
      data: assignment
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ success: false, error: 'Server error', details: err.message });
  }
};

module.exports = updateAssignment;

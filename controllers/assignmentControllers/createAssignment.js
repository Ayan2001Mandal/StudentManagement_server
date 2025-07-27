const Assignment = require('../../models/assignmentModel');

const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ error: 'Title and Due Date are required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded!' });
    }

    // time constraint 
    const due = new Date(dueDate.trim());
    const now = new Date();

    if (due <= now) {
      return res.status(400).json({ error: 'Due date and time must be in the future' });
    }

    const newAssignment = new Assignment({
      title,
      description,
      dueDate: new Date(dueDate.trim()),
      attachedFileUrl: req.file.path, // Cloudinary returns `path` 
      createdBy: req.user._id,
    });

    await newAssignment.save();

    res.status(201).json({
      success:'true',
      message: 'Assignment created successfully!',
      assignment: newAssignment
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({
      error: 'Upload failed',
      details: error.message,
    });
  }
};

module.exports = createAssignment


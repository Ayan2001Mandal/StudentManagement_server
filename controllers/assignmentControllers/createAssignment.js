const Assignment = require('../../models/assignmentModel');

// const createAssignment = async (req, res) => {
//   try {
//     console.log("in controller");
    
//     const { title, description, dueDate } = req.body;

//     if (!title || !dueDate) {
//       return res.status(400).json({ error: 'Title and Due Date are required' });
//     }

//     const newAssignment = new Assignment({
//       title,
//       description,
//       dueDate: new Date(dueDate.trim()),
//       attachedFileUrl: req.file?.secure_url || null, // Use secure_url from Cloudinary
//       createdBy: req.user.id
//     });
//     await newAssignment.save();

//     res.status(201).json({
//       message: 'Assignment created successfully',
//       assignment: newAssignment
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error: ' + error.message });
//   }
// };

const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ error: 'Title and Due Date are required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded!' });
    }

    console.log('Uploaded File:', req.file); // Debug Cloudinary response

    const newAssignment = new Assignment({
      title,
      description,
      dueDate: new Date(dueDate.trim()),
      attachedFileUrl: req.file.path, // Cloudinary returns `path` or `secure_url`
      createdBy: req.user.id,
    });

    await newAssignment.save();

    res.status(201).json({
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


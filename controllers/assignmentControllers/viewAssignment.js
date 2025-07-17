const Assignment = require('../../models/assignmentModel');
const User = require('../../models/userModels');

const getAllAssignments = async (req, res) => {
  try {
    const currentDate = new Date();
    
    const assignments = await Assignment.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'createdBy',
        select: 'fname lname email' // Changed to match your schema
      })
      .lean();
    
    const assignmentsWithStatus = assignments.map(assignment => {
      const dueDate = new Date(assignment.dueDate);
      const timeDiff = dueDate - currentDate;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      
      // Modified to use fname and lname
      let creatorInfo = {
        _id: assignment.createdBy?._id || null,
        name: 'Unknown User',
      };

      if (assignment.createdBy) {
        const { fname, lname, email } = assignment.createdBy;
        creatorInfo = {
          _id: assignment.createdBy._id,
          name: `${fname || ''} ${lname || ''}`.trim() || 'Unnamed User'
        };
      }
      
      return {
        ...assignment,
        createdBy: creatorInfo,
        status: daysDiff < 0 
          ? 'Date passed' 
          : daysDiff === 0 
            ? 'Due today' 
            : `${daysDiff} day${daysDiff > 1 ? 's' : ''} left`
      };
    });

    res.status(200).json({
      success: true,
      count: assignmentsWithStatus.length,
      data: assignmentsWithStatus
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
module.exports=getAllAssignments;
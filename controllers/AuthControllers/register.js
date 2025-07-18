const User = require("../../models/userModels");
const bcrypt = require('bcryptjs');

// const register = async (req, res) => {
//   try {
//     const { fname, lname, email, password, role } = req.body;


//     if (!fname || !lname || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }


//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: 'Email already in use' });
//     }


//     const hashedPassword = await bcrypt.hash(password, 10);


//     const newUser = new User({
//       fname,
//       lname,
//       email,
//       password: hashedPassword,
//       role 
//     });

//     await newUser.save();


//     res.status(201).json({
//       message: 'User registered successfully',
//       user: {
//         id: newUser._id,
//         fname: newUser.fname,
//         lname: newUser.lname,
//         email: newUser.email,
//         role: newUser.role,
//         createdAt: newUser.createdAt
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error: ' + err.message });
//   }
// };

//module.exports= register;

const register = async (req, res) => {
  try {
    const { fname, lname, email, password, role } = req.body;

    if (!fname || !email || !password) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if a user with this email already exists (regardless of active status)
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isActive) {
        return res.status(403).json({ message: 'Account is deactivated. Please contact admin.' });
      }
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      role: role || 'student', // default to student if not provided
      isActive: true,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        role: newUser.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

module.exports = register;

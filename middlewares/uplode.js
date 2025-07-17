const multer = require('multer');
const { storage } = require('../utils/cloudinary');

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only PDFs, JPEGs, and PNGs are allowed!'), false);
    }
  },
});

module.exports = upload;
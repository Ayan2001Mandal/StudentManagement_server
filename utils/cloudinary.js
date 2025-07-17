const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: (req, file) => ({
//     folder: 'assignments',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], 
//     resource_type: 'auto', 
//     public_id: `${Date.now()}-${file.originalname.split('.')[0]}`, 
//   }),
// });

// debug 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let resourceType = 'image'; // Default for images
    if (file.mimetype === 'application/pdf') {
      resourceType = 'raw'; // Force PDFs to use 'raw'
    }
    return {
      folder: 'assignments',
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
      resource_type: resourceType, // Dynamic resource type
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`, // Replace spaces with underscores
    };
  },
});

module.exports = { storage, cloudinary };
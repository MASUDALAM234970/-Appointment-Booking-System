// import multer from "multer";
// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null.file.orginalName);
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";

// Set storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // Specify the destination folder where files will be saved
  },
  filename: function (req, file, callback) {
    // Use the original file name, and make it unique by adding a timestamp
    callback(null, Date.now() + file.originalname); // Use file.originalname instead of file.orginalName
  },
});

// Create multer instance with the storage configuration
const upload = multer({ storage });

export default upload;

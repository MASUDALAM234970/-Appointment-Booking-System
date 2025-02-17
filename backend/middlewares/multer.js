import multer from "multer";
import path from "path";

// Ensure uploads directory exists
import fs from "fs";
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir); // Save to uploads/
  },
  filename: function (req, file, callback) {
    const uniqueName = Date.now() + "-" + file.originalname;
    callback(null, uniqueName); // Save with timestamp
  },
});

const upload = multer({ storage });

export default upload;

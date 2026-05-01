import multer from "multer";
import path from 'path';
import fs from 'fs';

// Define the path for uploads
const uploadDirectory = path.join(__dirname, '../../uploads');
console.log(uploadDirectory);

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the directory exists
        cb(null, uploadDirectory); // Absolute path
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName); // Unique filename
    }
});

// Export multer configuration
export const upload = multer({ storage });
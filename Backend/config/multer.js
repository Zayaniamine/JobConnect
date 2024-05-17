const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Main uploads directory
const uploadsDir = path.join(__dirname, 'uploads');

// Specific subdirectory for documents
const documentsDir = path.join(__dirname, 'uploads', 'Documents');

// Ensure the directory exists or create it
fs.mkdirSync(documentsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Use documents directory for specific file types
        if (file.fieldname === 'resumeFile' || file.fieldname === 'motivationLetterFile') {
            cb(null, documentsDir);
        } else {
            // Use general uploads directory for other file types
            cb(null, uploadsDir);
        }
    },
    filename: function(req, file, cb) {
        let prefix = file.fieldname === 'logoCompany' ? 'logoCompany-' : 'photo-';
        if (file.fieldname === 'resumeFile') {
            prefix = 'Resume-';
        } else if (file.fieldname === 'motivationLetterFile') {
            prefix = 'CoverLetter-';
        }

        cb(null, prefix + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|pdf|doc|docx)$/)) {
            return cb(new Error('Only PNG, JPG, JPEG, PDF, DOC, and DOCX files are allowed!'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;

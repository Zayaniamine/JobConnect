const multer = require('multer');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function(req, file, cb) {
        let prefix = file.fieldname === 'logoCompany' ? 'logoCompany-' : 'photo-';
        cb(null, prefix + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(png)$/)) {
            return cb(new Error('Only PNG files are allowed!'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;

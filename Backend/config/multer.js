const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'logoCompany-' + Date.now() + '.png') // Use a fixed name for the file
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

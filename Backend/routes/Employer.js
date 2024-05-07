const express = require('express');
const router = express.Router();
const corsMiddleware = require('../middlewares/corsmiddleware');
const { deleteUserProfile, updateUserProfile, getUserProfile } = require('../controllers/Employer');
const upload = require('../config/multer'); // Importer la configuration de Multer depuis le fichier

router.use(corsMiddleware);

router.get('/profile/:userId', getUserProfile); // Updated endpoint to include userId
router.delete('/delete-profile/:userId', deleteUserProfile); // Updated endpoint to include userId
router.put('/update-profile/:userId',upload.single('logoCompany'), updateUserProfile); // Updated endpoint to include userId

module.exports = router;

const express = require('express');
const router = express.Router();
const corsMiddleware   = require('../middlewares/corsmiddleware');
/*const {createJobOffer2} = require('../controllers/Jobtmp2')*/

const { test, logout,registerUser, login } = require('../controllers/authController');
/*const { createJobOffer ,deletePost,deleteJobOffer ,updateJobOffer,getJobOffersByPost } = require('../controllers/Job_Offers_Controller');*/
const upload = require('../config/multer'); // Importer la configuration de Multer depuis le fichier

router.use(corsMiddleware);

router.post('/login', login);
router.get('/', test);
router.post('/register', upload.fields([{ name: 'logoCompany', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), registerUser);// Supprimer un post


router.post('/logout', logout);
/*
router.post("/jobtemp2",createJobOffer2)
// Supprimer toute l'offre d'emploi
router.put('/jobOffers/:jobId', updateJobOffer);
router.get('/jobOffers/by-post/:postName', getJobOffersByPost);
router.delete('/jobOffers/:jobId/posts/:postId', deletePost);
router.post('/jobOffers', createJobOffer);
*/
module.exports = router;

const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobcontroller'); // Ensure this path is correct

router.post('/create-job', jobController.createJob);
router.get('/', jobController.getAllJobs);
router.delete('/:id', jobController.deleteJobOffer);
router.put('/update-joboffer/:id', jobController.updateJobOffer);
router.get('/count', jobController.getJobOffersCount);
router.post('/:jobOfferId/posts', jobController.addJobPost);
router.delete('/:jobOfferId/posts/:postId', jobController.deleteJobPost);
router.put('/:jobOfferId/posts/:postId', jobController.updateJobPost);
router.get('/:id/posts', jobController.getJobPostsByOfferId);
router.get('/employer/:employerId', jobController.getJobOffersByEmployerId);

module.exports = router;

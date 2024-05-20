const express = require('express');
const router = express.Router();
const jobSeekerController = require('../controllers/JobSeeker');
// Middleware to handle file uploads, if needed
const upload = require('../config/multer');
const { getAllEmployers } = require('../controllers/Employer');
const { getEmployerById } = require('../controllers/Employer');


router.get('/profile/:userId', jobSeekerController.getJobSeekerProfile);
router.put('/update-profile/:userId', upload.single('photo'), jobSeekerController.updateJobSeekerProfile);
router.delete('/delete-profile/:userId', jobSeekerController.deleteJobSeekerProfile);
router.post('/create-pdf/:userId', jobSeekerController.createJobSeekerPDF);
router.get('/fetch-pdf/:userId', jobSeekerController.fetchJobSeekerPDF);
router.put('/update-resume/:userId', jobSeekerController.updateJobSeekerResume);
router.put('/delete-resume/:userId', jobSeekerController.deleteJobSeekerResume);
router.get('/resume/:userId', jobSeekerController.getJobSeekerResume);
router.get('/employers', getAllEmployers);
router.get('/count-jobseeker', jobSeekerController.getJobseekerCount);
router.get('/employers/:employerId', getEmployerById);
router.post('/matching-score/:jobOfferId/:userId', jobSeekerController.MatchingScore);

module.exports = router;




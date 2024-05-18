const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Ensure this is the correct path to your upload configuration

const {
    createApplication,
    getApplications,
    updateApplicationStatus,
    deleteApplication,
    getApplicationsByJobSeeker,
    getApplicationsByJobOffer,
    getApplicationsForJobSeeker,
    getApplicationById,
    getApplicationsByEmployer,
    archiveApplication,
    acceptApplication,
    rejectApplication

} = require('../controllers/Applications');


// Route to create a new application with file uploads
router.post('/create-application', upload.fields([{ name: 'resumeFile', maxCount: 1 }, { name: 'motivationLetterFile', maxCount: 1 }]), createApplication);

// Route to get all applications (you might not need this if it's sensitive data)
router.get('/get-applications', getApplications);

// Route to update the status of an application
router.put('/update-application/:applicationId/status', updateApplicationStatus);

// Route to delete an application
router.delete('/delete-applications/:applicationId', deleteApplication);

// Route to fetch a single application by ID
router.get('/get-application/:applicationId', getApplicationById);

router.get('/get-applications/employer/:employerId', getApplicationsByEmployer);
// Route to fetch applications by a specific job offer
router.get('/get-applications/jobOffer/:jobOfferId', getApplicationsByJobOffer);
// Route to fetch applications by a specific job seeker

router.get('/get-applications/jobSeeker/:jobSeekerId',getApplicationsForJobSeeker);



// manage application

router.put('/rejected/:applicationId', rejectApplication);
router.put('/accepted/:applicationId',acceptApplication);
router.put('/archived/:applicationId', archiveApplication);

// Other routes...

module.exports = router;


module.exports = router;

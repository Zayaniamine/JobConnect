const Application = require('../models/Application');
const fs = require('fs');
const path = require('path');

exports.createApplication = async (req, res) => {
    const { jobSeekerId, jobOfferId,postId, firstName, lastName, email, salaryExpectations, coverLetter } = req.body;

    let resumeFile = req.files && req.files.resumeFile ? req.files.resumeFile[0].path : '';
    let motivationLetterFile = req.files && req.files.motivationLetterFile ? req.files.motivationLetterFile[0].path : '';

    try {
        const newApplication = new Application({
            jobSeekerId,
            jobOfferId,
            postId,
            firstName,
            lastName,
            email,
            salaryExpectations,
            coverLetter,
            resumeFile,
            motivationLetterFile,
            status: 'in progress'
        });

        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create application', error: error.message });
    }
};

// Get all applications
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate('jobSeekerId').populate('jobOfferId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
    }
};
// This function fetches a single application by ID
exports.getApplicationById = async (req, res) => {
    const { applicationId } = req.params;
    try {
        // Ensure deep population of the posts in the jobOffer
        const application = await Application.findById(applicationId)
            .populate({
                path: 'jobOfferId',
                populate: { path: 'posts' } // This assumes that jobOffer has a posts field which is an array of Post schemas
            })
            .populate('jobSeekerId');
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch the application', error: error.message });
    }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
    const { status } = req.body;
    const { applicationId } = req.params;

    try {
        const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status, lastUpdated: Date.now() }, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update application status', error: error.message });
    }
};

// Delete an application
exports.deleteApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Optionally remove associated files
        if (application.resumeFile) {
            fs.unlinkSync(path.join(__dirname, '..', application.resumeFile));
        }
        if (application.motivationLetterFile) {
            fs.unlinkSync(path.join(__dirname, '..', application.motivationLetterFile));
        }

        await application.remove();
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete application', error: error.message });
    }
};
// Fetch applications by job seeker ID


// Fetch applications by job offer ID
exports.getApplicationsByJobOffer = async (req, res) => {
    const { jobOfferId } = req.params; // Assuming you pass jobOfferId as a URL parameter

    try {
        const applications = await Application.find({ jobOfferId }).populate('jobSeekerId');
        if (applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this job offer' });
        }
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
    }
};
exports.getApplicationsForJobSeeker = async (req, res) => {
    const { jobSeekerId } = req.params;
    try {
        const applications = await Application.find({ jobSeekerId })
            .populate({
                path: 'jobOfferId',
                populate: {
                    path: 'posts'
                }
            })
            .exec();

        const enhancedApplications = applications.map(app => {
            const postDetails = app.jobOfferId.posts.id(app.postId); // Accessing the specific post using the id method on subdocuments
            return {
                ...app._doc,
                postDetails: postDetails
            };
        });

        res.json(enhancedApplications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error: error });
    }
};



module.exports = exports;

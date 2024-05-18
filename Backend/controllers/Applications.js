const Application = require('../models/Application');
const { JobOffer, JobPosition } = require('../models/joboffers');

const path = require('path');
const fs = require('fs').promises;

exports.createApplication = async (req, res) => {
    const { applicationId, jobSeekerId, jobOfferId, postId, firstName, lastName, email, salaryExpectations, coverLetter } = req.body;

    let resumeFile = req.files && req.files.resumeFile ? req.files.resumeFile[0].path : '';
    let motivationLetterFile = req.files && req.files.motivationLetterFile ? req.files.motivationLetterFile[0].path : '';

    try {
        if (applicationId) {
            // Updating an existing application
            const application = await Application.findById(applicationId);
            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
            }

            // Update the fields
            application.jobSeekerId = jobSeekerId;
            application.jobOfferId = jobOfferId;
            application.postId = postId;
            application.firstName = firstName;
            application.lastName = lastName;
            application.email = email;
            application.salaryExpectations = salaryExpectations;
            application.coverLetter = coverLetter;
            application.resumeFile = resumeFile || application.resumeFile;
            application.motivationLetterFile = motivationLetterFile || application.motivationLetterFile;

            await application.save();
            res.status(200).json(application);
        } else {
            // Creating a new application
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
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to process application', error: error.message });
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
        console.log("Fetching application with ID:", applicationId);  // Debug log
        const application = await Application.findById(applicationId)
            .populate({
                path: 'jobOfferId',
                populate: { path: 'posts' }
            });

        if (!application) {
            console.log("No application found for ID:", applicationId);  // Debug log
            return res.status(404).send('Application not found');
        }

        // Find the specific post by postId
        if (!application.jobOfferId) {
            console.log("Job offer not found in application:", applicationId);  // Debug log
            return res.status(404).send('Job offer not found within the application');
        }
        
        const post = application.jobOfferId.posts.id(application.postId);
        if (!post) {
            console.log("Post not found in job offer:", application.jobOfferId._id);  // Debug log
            return res.status(404).send('Post not found within the job offer');
        }

        const result = {...application._doc, postDetails: post};
        res.status(200).json(result);
    } catch (error) {
        console.error("Failed to fetch application:", error);  // Error log
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
        const application = await Application.findByIdAndDelete(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Server Error:', error);
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



exports.getApplicationsByEmployer = async (req, res) => {
    const { employerId } = req.params;

    try {
        // Fetch job offers by employer ID
        const jobOffers = await JobOffer.find({ employerId });

        if (jobOffers.length === 0) {
            console.log('No job offers found for this employer');
            return res.status(404).json({ message: 'No job offers found for this employer' });
        }

        // Extract job offer IDs
        const jobOfferIds = jobOffers.map(offer => offer._id);

        // Fetch applications by job offer IDs and populate the necessary fields
        const applications = await Application.find({ jobOfferId: { $in: jobOfferIds } })
            .populate({
                path: 'jobSeekerId',
                select: 'firstName lastName email phoneNumber address photo'
            })
            .populate('jobOfferId')
            .exec();

        const enhancedApplications = applications.map(app => {
            const postDetails = app.jobOfferId.posts.id(app.postId);
            return {
                ...app._doc,
                postDetails: postDetails ? postDetails.toObject() : null
            };
        });

        res.status(200).json(enhancedApplications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
    }
};
exports.rejectApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = 'rejected';
        await application.save();

        res.status(200).json({ message: 'Application rejected successfully' });
    } catch (error) {
        console.error('Error rejecting application:', error);
        res.status(500).json({ message: 'Failed to reject application', error: error.message });
    }
};

exports.acceptApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = 'accepted';
        await application.save();

        res.status(200).json({ message: 'Application accepted successfully' });
    } catch (error) {
        console.error('Error accepting application:', error);
        res.status(500).json({ message: 'Failed to accept application', error: error.message });
    }
};

exports.archiveApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = 'archived';
        await application.save();

        res.status(200).json({ message: 'Application archived successfully' });
    } catch (error) {
        console.error('Error archiving application:', error);
        res.status(500).json({ message: 'Failed to archive application', error: error.message });
    }
};



module.exports = exports;

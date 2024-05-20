const { User, JobSeeker } = require('../models/User'); // Correct the import path
const Resume = require('../models/Resume');
const bcrypt = require('bcrypt');
const fs = require('fs');
const pdf = require("html-pdf");
const pdfTemplate = require("../ResumeSample"); // Ensure you have this template
const path = require('path');
const { JobOffer, JobPosition } = require('../models/joboffers');


exports.getJobSeekerProfile = async (req, res) => {
    try {
        const jobSeeker = await JobSeeker.findById(req.params.userId).populate('resume');
        console.log(jobSeeker)
        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }
        res.json(jobSeeker);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateJobSeekerProfile = async (req, res) => {
    const { userId } = req.params;
    const { email, password, resume: resumeData, ...otherDetails } = req.body;

    try {
        const jobSeeker = await JobSeeker.findById(userId);
        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }

        // Update basic fields if provided
        if (email) jobSeeker.email = email;
        if (password) jobSeeker.password = await bcrypt.hash(password, 10);

        // Dynamically update other fields from otherDetails
        Object.keys(otherDetails).forEach(key => {
            jobSeeker[key] = otherDetails[key];
        });

        // Handle photo upload
        if (req.file) {
            // Remove old photo if it exists and replace it
            if (jobSeeker.photo && fs.existsSync(`../config/uploads/${jobSeeker.photo}`)) {
                fs.unlinkSync(`../config/uploads/${jobSeeker.photo}`);
            }
            jobSeeker.photo = req.file.filename; // Assuming you're saving the filename, adjust the path handling as needed
        }

        // Update or create a resume
        let resumeDocument;
        if (resumeData) {
            if (jobSeeker.resume) {
                resumeDocument = await Resume.findById(jobSeeker.resume);
                if (!resumeDocument) {
                    resumeDocument = new Resume({ ...resumeData, user: jobSeeker._id });
                    await resumeDocument.save();
                    jobSeeker.resume = resumeDocument._id;
                } else {
                    Object.assign(resumeDocument, resumeData);
                    await resumeDocument.save();
                }
            } else {
                resumeDocument = new Resume({ ...resumeData, user: jobSeeker._id });
                await resumeDocument.save();
                jobSeeker.resume = resumeDocument._id;
            }
        }

        await jobSeeker.save();
        res.status(200).json({ message: 'Profile updated successfully', jobSeeker });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Fetch Job Seeker's Resume
exports.getJobSeekerResume = async (req, res) => {
    const { userId } = req.params;
    try {
        const jobSeeker = await JobSeeker.findById(userId).populate('resume');
        if (!jobSeeker || !jobSeeker.resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json({ resume: jobSeeker.resume });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateJobSeekerResume = async (req, res) => {
    const { userId } = req.params;
    const { resume: resumeData } = req.body;

    try {
        const jobSeeker = await JobSeeker.findById(userId).populate('resume');
        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }

        let resumeDocument = jobSeeker.resume;
        if (!resumeDocument) {
            // If no resume exists, create a new one
            resumeDocument = new Resume({ ...resumeData, user: jobSeeker._id });
            await resumeDocument.save();
            jobSeeker.resume = resumeDocument._id;
        } else {
            // If resume exists, update it
            Object.assign(resumeDocument, resumeData);
            await resumeDocument.save();
        }

        await jobSeeker.save();
        res.status(200).json({ message: 'Resume updated successfully', resume: resumeDocument });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.deleteJobSeekerResume = async (req, res) => {
    const { userId } = req.params;

    try {
        const jobSeeker = await JobSeeker.findById(userId).populate('resume');
        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }

        // Check if the job seeker actually has a resume
        if (!jobSeeker.resume) {
            return res.status(404).json({ message: 'No resume found for this job seeker' });
        }

        // Delete the resume document
        await Resume.findByIdAndDelete(jobSeeker.resume._id);

        // Remove the resume reference from the job seeker document
        jobSeeker.resume = null;
        await jobSeeker.save();

        // Optional: Delete any associated files, if stored on the server
        const resumeFilePath = path.join(__dirname, `../resumes/Resume-${userId}.pdf`);
        if (fs.existsSync(resumeFilePath)) {
            fs.unlinkSync(resumeFilePath);
        }

        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteJobSeekerProfile = async (req, res) => {
    try {
        const jobSeeker = await JobSeeker.findById(req.params.userId);
        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }

        if (jobSeeker.photo && fs.existsSync(jobSeeker.photo)) {
            fs.unlinkSync(jobSeeker.photo);
        }

        await jobSeeker.remove();
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createJobSeekerPDF = (req, res) => {
    if (!req.body || !req.body.resume) {
        return res.status(400).send("Resume data is required.");
    }

    const data = req.body;
    const userId = data.userId; // Assuming userId is passed in the request body
    const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
        header: {
            height: '20mm',
            contents: `<div style="text-align: center;">${data.resume.firstName} ${data.resume.lastName}'s Resume</div>`
        },
        footer: {
            height: '20mm',
            contents: {
                first: ' ',
                2: 'Second page',
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                last: 'Last Page'
            }
        },
        // Specify the path to the wkhtmltopdf binary
        childProcessOptions: {
            env: {
                PATH: process.env.PATH + ';"C:\\Program Files\\wkhtmltopdf\\bin"'
            }
        }
    };

    const pdfPath = path.join(__dirname, `../resumes/Resume-${userId}.pdf`); // Unique path for each user

    pdf.create(pdfTemplate(data), options).toFile(pdfPath, (err, result) => {
        if (err) {
            console.error("Error creating PDF:", err);
            return res.status(500).json({
                message: "Error creating PDF",
                error: err.message
            });
        }
        console.log(`PDF generated successfully for ${data.resume.firstName} ${data.resume.lastName}`);
        res.status(200).send("PDF generated successfully");
    });
};

exports.fetchJobSeekerPDF = (req, res) => {
    const userId = req.params.userId; // Assuming userId is passed as a URL parameter
    const filePath = path.join(__dirname, `../resumes/Resume-${userId}.pdf`);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Error reading PDF file:", err);
            return res.status(500).send("Failed to read PDF file");
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="Resume-${userId}.pdf"`);
        res.send(data);
    });
};
exports.getAllJobSeekers = async (req, res) => {
    try {
        const jobSeekers = await JobSeeker.find();
        res.json(jobSeekers);
    } catch (error) {
        console.error('Error fetching job seekers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getJobseekerCount = async (req, res) => {
    try {
      const count = await JobSeeker.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.MatchingScore = async (req, res) => {
    const { jobOfferId, jobSeekerId } = req.params;
    try {

        // Find the job offer
        const jobOffer = await JobOffer.findById(jobOfferId);

        if (!jobOffer) {
            return res.status(404).json({ error: { code: 'JOB_OFFER_NOT_FOUND', message: 'Job offer not found' } });
        }

        // Find the job seeker's resume
        const resume = await Resume.findOne({ user: jobSeekerId });
        const jobSeeker = await JobSeeker.findOne({ jobSeekerId });

        if (!resume) {
            return res.status(404).json({ error: { code: 'RESUME_NOT_FOUND', message: 'Resume not found' } });
        }

        if (!jobSeeker) {
            return res.status(404).json({ error: { code: 'JOB_SEEKER_NOT_FOUND', message: 'Job seeker not found' } });
        }

        // Initialize matching score
        let matchingScore = 0;

        // Weight for job title match
        
        if (jobOffer.title == resume.jobTitle) {
            matchingScore += 10;
        }

        // Weight for address match
        if (jobOffer.address == resume.address) {
            matchingScore += 10;
        }

        // Weight for skills match
        const jobOfferSkills = jobOffer.posts.flatMap(post => post.skills);
        const resumeSkills = resume.skills.map(skill => skill.skillName);
        const skillMatchCount = jobOfferSkills.filter(skill => resumeSkills.includes(skill)).length;
        matchingScore += (skillMatchCount / jobOfferSkills.length) * 30;

        // Weight for job positions match
        const positionMatchCount = jobOffer.posts.filter(post =>
            resume.experiences.some(exp =>
                exp.jobTitle === post.title && exp.description === post.content
            )
        ).length;
        matchingScore += (positionMatchCount / jobOffer.posts.length) * 20;

        // Compare job seeker's preferencesRecherche with job offer's title and description
        jobSeeker.preferencesRecherche.flatMap(preference => {
            if (jobOffer.titre.includes(preference)) {
                matchingScore += 2;
            }
            if (jobOffer.description.includes(preference)) {
                matchingScore += 1;
            }
        });

        // Compare job seeker's preferencesRecherche with job offer's jobType
        jobSeeker.preferencesRecherche.forEach(preference => {
            if (jobOffer.posts.jobType === preference) {
                matchingScore += 2;
            }
        });

        // Compare job seeker's preferencesRecherche with job offer's posts' titles
        jobOffer.posts.forEach(post => {
            jobSeeker.preferencesRecherche.forEach(preference => {
                if (post.title.includes(preference)) {
                    matchingScore += 2;
                }
            });
        });

        // Compare job seeker's preferencesRecherche with job offer's posts' jobTypes
        jobOffer.posts.forEach(post => {
            
            jobSeeker.preferencesRecherche.forEach(preference => {
                
                if (post.jobType === preference) {
                    matchingScore += 1;
                    console.log(matchingScore)
                }
            });
        });

        // Add more comparisons for other fields if needed

        res.json({ matchingScore });
    } catch (error) {
        console.error('Error calculating matching score:', error.message);
        return res.status(500).json({ error: { code: 'INTERNAL_SERVER_ERROR', message: 'An internal server error occurred' } });
    }
};



  
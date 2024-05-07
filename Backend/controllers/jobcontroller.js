const { JobOffer, JobPosition } = require('../models/joboffers'); 

// Create a new job position


exports.createJob = async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));  // This will show you what the server is actually receiving

  try {
    const jobData = req.body;
    if (jobData.posts) {
      for (let post of jobData.posts) {
        if (!post.title || !post.content) {
          return res.status(400).json({ message: "Each position must have a title and content." });
        }
      }
    }
  

    const job = new JobOffer(jobData);
    const savedJob = await job.save();
    res.status(201).json({ message: "Job created successfully with posts", job: savedJob });
  } catch (error) {
    console.error('Error creating job with posts:', error);
    res.status(500).json({ message: "Failed to create job with posts", error: error.toString() });
  }
};



// Get all job positions
exports.getAllJobs = async (req, res) => {
  try {
    // Execute a find operation to get all job positions.
    const jobs = await JobOffer.find();

    // No need to use countDocuments since we're not using the total count here.
    // The response has been modified to match the structure used in updateJobOffer.
    res.status(200).json(jobs);
  } catch (error) {
    // Error response also matches the structure used in updateJobOffer.
    res.status(500).send({ message: 'Failed to retrieve jobs', error: error.toString() });
  }
};

// Delete a job offer by ID
exports.deleteJobOffer = async (req, res) => {
  try {
    await JobOffer.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Job offer deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete job offer', error: error.toString() });
  }
};

// Update a job offer by ID
exports.updateJobOffer = async (req, res) => {
  try {
    const updatedJobOffer = await JobOffer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJobOffer) {
      return res.status(404).send({ message: 'Job offer not found' });
    }
    res.status(200).json(updatedJobOffer);
  } catch (error) {
    res.status(500).send({ message: 'Failed to update job offer', error: error.toString() });
  }
};

// Get count of job offers
exports.getJobOffersCount = async (req, res) => {
  try {
    const count = await JobOffer.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a Job Post to an existing Job Offer
exports.addJobPost = async (req, res) => {
  const { jobOfferId } = req.params;
  const newPost = req.body;

  try {
      const updatedJobOffer = await JobOffer.findByIdAndUpdate(
          jobOfferId,
          { $push: { posts: newPost } },
          { new: true }
      );
      if (!updatedJobOffer) {
          return res.status(404).json({ message: 'Job offer not found' });
      }
      res.status(200).json(updatedJobOffer);
  } catch (error) {
      console.error('Error adding job post:', error);
      res.status(500).json({ message: 'Failed to add job post', error: error.toString() });
  }
};

// Delete a Job Post from a Job Offer
exports.deleteJobPost = async (req, res) => {
  const { jobOfferId, postId } = req.params;

  try {
      const updatedJobOffer = await JobOffer.findByIdAndUpdate(
          jobOfferId,
          { $pull: { posts: { _id: postId } } },
          { new: true }
      );
      if (!updatedJobOffer) {
          return res.status(404).json({ message: 'Job offer not found' });
      }
      res.status(200).json(updatedJobOffer);
  } catch (error) {
      console.error('Error deleting job post:', error);
      res.status(500).json({ message: 'Failed to delete job post', error: error.toString() });
  }
};

// Update a Job Post within a Job Offer
exports.updateJobPost = async (req, res) => {
  const { jobOfferId, postId } = req.params;
  const postUpdates = req.body;

  try {
      const updatedJobOffer = await JobOffer.findOneAndUpdate(
          { "_id": jobOfferId, "posts._id": postId },
          { "$set": { "posts.$": postUpdates } },
          { new: true }
      );
      if (!updatedJobOffer) {
          return res.status(404).json({ message: 'Job offer not found' });
      }
      res.status(200).json(updatedJobOffer);
  } catch (error) {
      console.error('Error updating job post:', error);
      res.status(500).json({ message: 'Failed to update job post', error: error.toString() });
  }
};
exports.getJobPostsByOfferId = async (req, res) => {
  const { id } = req.params; // Extracting the job offer ID from the URL

  try {
      const jobOffer = await JobOffer.findById(id); // Find the job offer by ID
      if (!jobOffer) {
          return res.status(404).json({ message: 'Job offer not found' }); // If no job offer is found, return a 404
      }
      res.status(200).json(jobOffer.posts); // Return the posts array from the found job offer
  } catch (error) {
      console.error('Failed to retrieve job posts:', error);
      res.status(500).json({ message: 'Failed to retrieve job posts', error: error.toString() });
  }
};


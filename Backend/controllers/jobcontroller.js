const { JobOffer, JobPosition } = require('../models/joboffers');

exports.createJob = async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));  // Log received data

  try {
    const jobData = req.body;
    if (!jobData.employerId) {
      return res.status(400).json({ message: "EmployerId is required." });
    }
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

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobOffer.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve jobs', error: error.toString() });
  }
};

exports.deleteJobOffer = async (req, res) => {
  try {
    await JobOffer.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Job offer deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete job offer', error: error.toString() });
  }
};

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

exports.getJobOffersCount = async (req, res) => {
  try {
    const count = await JobOffer.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  const { id } = req.params;

  try {
    const jobOffer = await JobOffer.findById(id);
    if (!jobOffer) {
      return res.status(404).json({ message: 'Job offer not found' });
    }
    res.status(200).json(jobOffer.posts);
  } catch (error) {
    console.error('Failed to retrieve job posts:', error);
    res.status(500).json({ message: 'Failed to retrieve job posts', error: error.toString() });
  }
};

exports.getJobOffersByEmployerId = async (req, res) => {
  const { employerId } = req.params;

  try {
    const jobOffers = await JobOffer.find({ employerId });
    if (!jobOffers.length) {
      return res.status(404).json({ message: 'No job offers found for this employer' });
    }
    res.status(200).json(jobOffers);
  } catch (error) {
    console.error('Failed to retrieve job offers:', error);
    res.status(500).json({ message: 'Failed to retrieve job offers', error: error.toString() });
  }
};

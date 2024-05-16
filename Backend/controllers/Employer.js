const { User, JobSeeker, Employer } = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Get user profile data
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { email, password, ...otherDetails } = req.body;

        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        
        // Update other fields
        Object.keys(otherDetails).forEach(key => {
            user[key] = otherDetails[key];
        });

        // Handle logoCompany file upload
        if (req.file) {
            // Remove old file if exists
            if (user.logoCompany && fs.existsSync(user.logoCompany)) {
                fs.unlinkSync(user.logoCompany);
            }
            user.logoCompany = req.file.path;
        }

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove profile logo file if exists
        if (user.logoCompany && fs.existsSync(user.logoCompany)) {
            fs.unlinkSync(user.logoCompany);
        }

        await user.remove();
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllEmployers = async (req, res) => {
    try {
        const employers = await Employer.find();
        res.json(employers);
    } catch (error) {
        console.error('Error fetching employers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getEmployerCount = async (req, res) => {
    try {
      const count = await Employer.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.getEmployerById = async (req, res) => {
    try {
        const employerId = req.params.employerId;
        const employer = await Employer.findById(employerId);
        console.log(employer)
                if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }
        res.json(employer);
    } catch (error) {
        console.error('Error fetching employer:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

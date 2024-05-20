/*const User = require('../models/user');*/
const bcrypt = require('bcrypt');
const logger = require('../middlewares/logger');
const jwt = require('jsonwebtoken');
const secretKey = '21051712022002';
const { User, JobSeeker, Employer, } = require('../models/User');


const test = (req,res)=>{
    res.json('test is working ')
}
const registerUser = async (req, res) => {
    const { email, password, role, userId, ...otherDetails } = req.body;

    try {
        if (userId) {
            // Step 2: Completing or updating user profile
            const userUpdate = await User.findById(userId);
            if (!userUpdate) {
                return res.status(404).json({ error: 'User not found.' });
            }

            Object.assign(userUpdate, otherDetails);
            
            // Assign file paths if files were uploaded
            if (req.files) {
                if (req.files.photo) {
                    userUpdate.photo = req.files.photo[0].path;
                }
                if (req.files.logoCompany) {
                    userUpdate.logoCompany = req.files.logoCompany[0].path;
                }
            }
            if (req.fileValidationError) {
                return res.status(400).json({ error: req.fileValidationError });
            }

            await userUpdate.save();
            return res.status(200).json({ success: true, message: 'Profile updated successfully.', user: userUpdate });
            
        } else {
            // Step 1: Initial registration
            if (!email || !password || !role) {
                return res.status(400).json({ error: 'Email, password, and role are required.' });
            }

            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,}$/;
            if (!strongPasswordRegex.test(password)) {
                return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.' });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ error: 'User with this email already exists.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser = new User({
                email,
                password: hashedPassword,
                role,
                ...otherDetails
            });

            // Assign file paths if files were uploaded
            if (req.files) {
                if (req.files.photo) {
                    newUser.photo = req.files.photo[0].path;
                }
                if (req.files.logoCompany) {
                    newUser.logoCompany = req.files.logoCompany[0].path;
                }
            }

            await newUser.save();
            return res.status(201).json({ success: true, message: 'Registration successful. Please complete your profile.', userId: newUser._id });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const loginAttempts = {}; // Pour suivre les tentatives de connexion infructueuses
let lockedAccounts = {}; // Pour suivre les comptes bloqués



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                error: 'Email and password are required'
            });
        }

      console.log( { email, password })

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                error: 'User not found'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        const MAX_LOGIN_ATTEMPTS = 5;      // Maximum allowed login attempts before locking the account
        const INITIAL_LOCK_TIME = 30000;   // Initial lock time in milliseconds (e.g., 30 seconds)
        const MAX_LOCK_TIME = 3600000;     // Maximum lock time in milliseconds (e.g., 1 hour)
        let LOCK_TIME = INITIAL_LOCK_TIME; // Current lock time (starts with the initial lock time)
        
        const loginAttempts = {};          // Store login attempts per email
        const lockedAccounts = {};         // Store lock time per email
        
        if (!passwordMatch) {
            // Increment the login attempt counter
            loginAttempts[email] = (loginAttempts[email] || 0) + 1;
        
            // Check if the account should be locked
            if (loginAttempts[email] >= MAX_LOGIN_ATTEMPTS) {
                // Check if the account has reached maximum lock time
                if (LOCK_TIME < MAX_LOCK_TIME) {
                    LOCK_TIME = Math.min(LOCK_TIME * 2, MAX_LOCK_TIME); // Ensure lock time does not exceed MAX_LOCK_TIME
                    lockedAccounts[email] = new Date().getTime() + LOCK_TIME;
                    delete loginAttempts[email];
        
                    return res.json({
                        error: `Too many unsuccessful login attempts. Account locked for ${LOCK_TIME / 1000} seconds`
                    });
                } else {
                    lockedAccounts[email] = 'permanently';
                    delete loginAttempts[email];
                    return res.json({
                        error: 'Too many unsuccessful login attempts. Your account is now locked permanently'
                    });
                }
            }
        
            // Check if the account is already locked
            if (lockedAccounts[email]) {
                const now = new Date().getTime();
                if (lockedAccounts[email] === 'permanently') {
                    return res.json({
                        error: 'Your account is locked permanently'
                    });
                } else if (now < lockedAccounts[email]) {
                    const timeLeft = Math.ceil((lockedAccounts[email] - now) / 1000);
                    return res.json({
                        error: `Account locked. Please try again in ${timeLeft} seconds`
                    });
                } else {
                    delete lockedAccounts[email]; // Unlock the account if the lock time has passed
                    delete loginAttempts[email];  // Reset the login attempt counter
                }
            }
        
            return res.json({
                error: 'Invalid password'
            });
        }
        
        // Reset the login attempt counter and lock time on successful login
        delete loginAttempts[email];
        delete lockedAccounts[email];
        LOCK_TIME = INITIAL_LOCK_TIME; // Reset the lock time to the initial value
        logger.info(`User logged in: ${email}`); // Log the successful login

        // Authentification réussie
        const token = jwt.sign({ userId: user._id , username : user.username , userEmail : user.email , userPassword : user.password }, secretKey, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
const tokenBlacklist = new Set();

const logout = (req, res) => {
    try {
        // Optionally blacklist the JWT token
        if (req.body.token) {
            tokenBlacklist.add(req.body.token);
            console.log(`Token blacklisted: ${req.body.token}`);
        }

        // Log the user logout action (optional)
        console.log(`User ${req.body.userId || 'unknown'} logged out successfully`);

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    test,
    registerUser,
    login,
    lockedAccounts,
    loginAttempts,
    logout
};
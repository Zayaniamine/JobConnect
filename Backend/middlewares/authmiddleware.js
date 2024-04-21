const { lockedAccounts, loginAttempts } = require('../controllers/authController');

const maxLoginAttempts = 10;
let lockTime = 2.5 * 60 * 1000;
const maxLockTime = 45 * 60 * 1000;

const authMiddleware = (req, res, next) => {
    const { email } = req.body;

    if (lockedAccounts[email]) {
        const now = new Date().getTime();
        if (now < lockedAccounts[email]) {
            const timeLeft = Math.ceil((lockedAccounts[email] - now) / 1000);
            return res.json({
                error: `Account locked. Please try again in ${timeLeft} seconds`
            });
        } else if (lockedAccounts[email] === 'permanently') {
            return res.json({
                error: 'Your account is locked permanently'
            });
        } else {
            delete lockedAccounts[email];
            delete loginAttempts[email];
        }
    }

    next();
};

const jwt = require('jsonwebtoken');
const { user } = require('../models/user');
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'Token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token is invalid' });
        }
        req.userData = decoded;
        next();
    });
};
// const JobMiddleware = async (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: Token is missing' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Unauthorized: Token is invalid' });
//         }

//         // Check if the user has the role of employer
//         if (decoded.role !== 'employer') {
//             return res.status(403).json({ message: 'Forbidden: User is not an employer' });
//         }

//         // User is authenticated and has the role of employer
//         next();
//     });
// };


// const verifyToken_Job = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Unauthorized: Token is missing or invalid' });
//     }

//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Unauthorized: Token is invalid' });
//         }

//         req.user = decoded;
//         next();
//     });
// };

module.exports = {
    authMiddleware,
    verifyToken,
    // JobMiddleware,
    // verifyToken_Job
};
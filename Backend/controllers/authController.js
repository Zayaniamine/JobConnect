const User = require('../models/user');
const bcrypt = require('bcrypt');
const logger = require('../logger');
const jwt = require('jsonwebtoken');
const secretKey = '21051712022002';


const test = (req,res)=>{
    res.json('test is working ')
}
const registerUser = async (req, res) => {
    try {
        const { username, email, password, Role, companyName, industryField, address, websiteUrl, linkedin } = req.body;

        if (!username) {
            return res.json({
                error: 'Username is required'
            });
        }

        if (!email) {
            return res.json({
                error: 'Email is required'
            });
        }

        if (!password ) {
            return res.json({
                error: 'Password is required '
            });
        }
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

if (!strongPasswordRegex.test(password)) {
    return res.json({
        error: 'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long'
    });
}

        if (!Role) {
            return res.json({
                error: 'Role is required'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.info(`User registration failed - email ${email} already exists`);
            return res.json({
                error: 'User with this email already exists'
            });
        }

        // Create a new user
        const newUser = new User({
             username ,
              email ,
               password :hashedPassword ,
             Role
        });
        if (Role === 'employeur') {

            // Vérifier que les champs supplémentaires obligatoires sont présents
            if (!companyName || !industryField || !logoCompany || !address || !websiteUrl || !linkedin) {
                return res.status(400).json({ error: 'Missing required fields for employer role' });
            }
                        const logoCompany = req.file.path;


            // Ajouter les champs supplémentaires
            newUser.companyName = companyName;
            newUser.industryField = industryField;
            newUser.logoCompany = logoCompany;
            newUser.address = address;
            newUser.websiteUrl = websiteUrl;
            newUser.linkedin = linkedin;
        }
        // Save the new user to the database
        await newUser.save();
        logger.info(`User registered: ${email}`); // Enregistrement de l'inscription de l'utilisateur

        res.json('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
const loginAttempts = {}; // Pour suivre les tentatives de connexion infructueuses
let lockedAccounts = {}; // Pour suivre les comptes bloqués

let MAX_LOGIN_ATTEMPTS = 10; // Nombre maximal de tentatives de connexion avant de bloquer le compte
let LOCK_TIME = 2.5 * 60 * 1000; // Durée de blocage initiale du compte en millisecondes (5 minutes)
let MAX_LOCK_TIME = 45 * 60 * 1000; // Durée maximale de blocage du compte en millisecondes (45 minutes)

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                error: 'Email and password are required'
            });
        }

    

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                error: 'User not found'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Incrémenter le compteur de tentatives de connexion infructueuses
            loginAttempts[email] = (loginAttempts[email] || 0) + 1;

            if (loginAttempts[email] >= MAX_LOGIN_ATTEMPTS) {
                // Doubler le temps de blocage et réinitialiser le compteur de tentatives de connexion
                if (LOCK_TIME < MAX_LOCK_TIME) {
                    LOCK_TIME = LOCK_TIME * 2;
                    lockedAccounts[email] = new Date().getTime() + LOCK_TIME;
                    delete loginAttempts[email];
    
                    return res.json({
                        error: `Too many unsuccessful login attempts. Account locked for ${LOCK_TIME / 1000} seconds after next unsuccessful attempt`
                    });
                } else {
                    lockedAccounts[email] = 'permanently';
                    delete loginAttempts[email];
                    return res.json({
                        error: 'Too many unsuccessful login attempts. Your account is now locked permanently'
                    });
                }
            }
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

            return res.json({
                error: 'Invalid password'
            });
        }
        

        // Réinitialiser le compteur de tentatives de connexion infructueuses
        delete loginAttempts[email];
        logger.info(`User logged in: ${email}`); // Enregistrement de la connexion de l'utilisateur

        // Authentification réussie
        const token = jwt.sign({ userId: user._id , username : user.username , userEmail : user.email , userPassword : user.password }, secretKey, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                Role: user.Role
            }
        });
    } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};



module.exports = {
    test,
    registerUser,
    login,
    lockedAccounts,
    loginAttempts
};
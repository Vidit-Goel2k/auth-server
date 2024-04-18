const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Password format validation 
        // Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 8 characters long' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = signup;

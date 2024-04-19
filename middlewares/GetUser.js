const User = require('../models/UserModel'); // Assuming you have a User model

const getUserInfo = async (req, res) => {
    try {
        // Retrieve user based on userId attached to the request object
        const user = await User.findById(req.userId, '-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        // Attach user object to the request for later use
        req.user = user;
        
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = getUserInfo;

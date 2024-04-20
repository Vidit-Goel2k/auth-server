const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const authHeaderCookie = req.headers.cookie;

    console.log(req.headers)

    // Check if token is provided
    if (!authHeaderCookie || !authHeaderCookie.startsWith('token=')) {
        return res.status(401).json({ success: false, message: 'No token provided', hello:req.headers });
    }

    // Extract token from Authorization header
    const token = authHeaderCookie.split('=')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        // Attach the decoded user ID to the request object for later use
        req.userId = decoded.userId;
        
        console.log('Token verified successfully');

        next();
    } catch (error) {
        // Handle token verification errors
        console.error('Error verifying token:', error);
        return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
    }
};

module.exports = verifyToken;

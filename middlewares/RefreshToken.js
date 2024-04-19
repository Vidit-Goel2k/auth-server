const jwt = require('jsonwebtoken');

const refreshToken = (req, res, next) => {
    const prevCookie = req.headers.cookie;
  
    // Extract the previous token from cookies
    const prevToken = prevCookie && prevCookie.split('=')[1];

    // If no previous token found, return a 400 error
    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
    }

    // Verify the previous token
    jwt.verify(prevToken, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Authentication failed' });
        }
        
        // Generate a new token with a shorter expiration
        const newToken = jwt.sign({ userId: decodedToken.userId }, process.env.JWT_SECRET, {
            expiresIn: '30s',
        });

        // Set the new token as a cookie
        res.cookie('token', newToken, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 35), // 35 seconds
            httpOnly: true,
            sameSite: 'lax',
        });

        next();
    });
};

module.exports = refreshToken;

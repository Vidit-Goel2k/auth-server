const jwt = require("jsonwebtoken");

const extractTokenFromCookie = (cookieString) => {
	if (!cookieString) {
		return null;
	}

	// Split the cookie string by semicolons to get individual cookies
	const cookies = cookieString.split(";");

	// Find the cookie containing the token
	const tokenCookie = cookies.find((cookie) =>
		cookie.trim().startsWith("token=")
	);

	if (!tokenCookie) {
		return null;
	}

	// Extract the token from the cookie value
	const token = tokenCookie.split("=")[1];

	return token;
};

const verifyToken = (req, res, next) => {
	const authHeaderCookie = req.headers.cookie;

	// Extract token from Authorization header
	const token = extractTokenFromCookie(authHeaderCookie);

	// Check if token is provided
	if (!authHeaderCookie || !authHeaderCookie.startsWith("token=")) {
		return res
			.status(401)
			.json({
				success: false,
				message: "No token provided",
				hello: req.headers,
			});
	}

	try {
		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach the decoded user ID to the request object for later use
		req.userId = decoded.userId;

		console.log("Token verified successfully");

		next();
	} catch (error) {
		// Handle token verification errors
		console.error("Error verifying token:", error);
		return res
			.status(403)
			.json({ success: false, message: "Failed to authenticate token" });
	}
};

module.exports = verifyToken;

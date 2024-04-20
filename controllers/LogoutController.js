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

const logoutController = async (req, res, next) => {
	try {
		const cookies = req.headers.cookie;
		const prevToken = extractTokenFromCookie(cookies);

		if (!prevToken) {
			return res.status(400).json({ message: "Couldn't find token" });
		}

		jwt.verify(prevToken, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				console.error(err);
				return res.status(403).json({ message: "Authentication failed" });
			}

			res.clearCookie(`${user.id}`, {
				httpOnly: true,
				sameSite: "lax",
			});

			return res.status(200).json({ message: "Successfully Logged Out" });
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = logoutController;

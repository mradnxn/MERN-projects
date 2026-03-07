const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    // 1. Check if the request contains an Authorization header that starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // 2. Extract the token from the header string (Format: "Bearer <token>")
            token = req.headers.authorization.split(" ")[1];

            // 3. Verify the token using the secret key we defined in the .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Find the user in the database using the ID embedded inside the decoded token
            // We use .select("-password") to ensure we don't accidentally attach the user's hashed password to the request
            req.user = await User.findById(decoded.id).select("-password");

            // 5. If everything went well, move on to the next function (the controller)
            next();
            
        } catch (error) {
            // If the token is invalid or expired, catch the error and reject the request
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // 6. If no token was found in the headers at all
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

module.exports = { protect };

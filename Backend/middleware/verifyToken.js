import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

export const verifyToken = (req, res, next) => {
    console.log('Cookies:', req.cookies); // Log all cookies to see if 'token' is present
    const token = req.cookies ? req.cookies.token : undefined;
    console.log('Token:', token); // Log token to check its presence

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

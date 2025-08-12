const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const isUserPresent = async (req, res, next) => {
    
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ 
            message: "Access denied. No token provided." 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user;

        next();
    }
    catch (err) {
        console.error(err);
        return res.status(403).json({ 
            message: "Invalid or expired token." 
        });
    }
}

const isAdmin = (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || user.role !== "admin") {
        return res.status(403).json({ 
            message: "User not admin" 
        });
    }
    next();
}

module.exports = { isUserPresent, isAdmin };
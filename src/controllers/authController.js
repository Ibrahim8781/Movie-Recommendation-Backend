const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const register = async (req, res) => {

    console.log(req.body);

    try {
        const { name, email, password, favoriteGenres } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Enter all fields",
            });
        }

        const exitingUser = await User.findOne({email});
        if (exitingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
            })
        }

        const newUser = new User({
            name,
            email,
            password,
            favoriteGenres,
            role 
        })

        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        return res.status(201).json({
            newUser,
            token
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "Server Error",
        })
    }
}

const login = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Enter all fields",
            });
        }

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({
                message: "User with this email doesnt exist. Try signup",
            })
        }

        const isValidPassword = existingUser.comparePassword(password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Incorrect password. Please try again",
            });
        }

        const token = jwt.sign(
            {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        return res.status(200).json({
            message: "Login Successful",
            token,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json();
    }
}

module.exports = { 
    register, 
    login 
};
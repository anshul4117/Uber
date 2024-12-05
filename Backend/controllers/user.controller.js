const User = require('../models/user.schema');
const blackList = require('../models/blackListToken.schema')
const userService = require('../services/user.service');
const { validateRegisterData, validateLoginData } = require('../utils/validation');

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        validateRegisterData(req);
        // check the user already register or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        

        const user = await userService.createUser({
            fullName,
            email,
            password
        });
        const token = await user.generateToken()
        res.status(201).json({
            message: 'User created successfully',
            user,
            token
        });
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error : " + error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        validateLoginData(req);
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new Error('User not found');
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }
        const token = await user.generateToken();
        res.cookie("token",
            token,
        )
        res.status(200).json({
            message: 'User logged in successfully',
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            message: "Error : " + error.message
        })
    }
}

const userProfile = async (req, res) => {
    try {
        const user = req.user;
        res.json({
            user
        })
    } catch (error) {
        res.status(400).json({
            message: "Error : " + error.message
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        await blackList.create({ token });
        res.status(200).json({
            message: 'User logged out successfully',
        })
    } catch (error) {
        res.status(400).json({
            message: "Error : " + error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    userProfile,
    logoutUser
}
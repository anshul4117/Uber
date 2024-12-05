const captainService = require('../services/captain.service');
const Captain = require('../models/captain.schema');
const { validateRegisterCaptainData, validateCaptainLoginData } = require('../utils/validation');
const blackListTokenSchema = require('../models/blackListToken.schema');

const registerCaptain = async (req, res) => {
    try {
        validateRegisterCaptainData(req);
        const { fullName, email, password, vehicle } = req.body;

        const isCaptainExist = await Captain.findOne({ email });
        if (isCaptainExist) {
            throw new Error('Captain already exists');
        }

        // Wait for the captain creation
        const captain = await captainService.createCaptain({
            fullName,
            email,
            password,
            vehicle,
        });

        // Returning the created captain object
        // call generateToken methods which custom build method in captain schema
        const token = await captain.generateToken()
        res.status(201).json({ captain, token });
    } catch (error) {
        res.status(401).json({
            message: 'Error ' + error.message,
        });
    }
}

const loginCaptain = async (req, res) => {
    try {
        validateCaptainLoginData(req);
        const { email, password } = req.body;
        const captain = await Captain.findOne({ email }).select('+password firstName email');
        if (!captain) {
            throw new Error('Captain not found');
        }
        const isValidPassword = await captain.comparePassword(password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        // generate Token
        const token = await captain.generateToken();

        // set token in cookie
        res.cookie('token', token)
            .status(200).
            json({ captain, token });


    } catch (error) {
        res.status(401).json({
            message: 'Error ' + error.message
        })
    }
}


const captainProfile = async (req, res) => {
    try {
        const captain = req.captain;
        const captainData = await Captain.findById(captain._id).select('-password');
        res.status(200).json(captainData);
    } catch (error) {
        res.status(401).json({
            message: 'Error ' + error.message
        })
    }
}

const captainLogout = async (req, res) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        await blackListTokenSchema.create({ token });
        res.clearCookie('token')
            .status(200)
            .json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(401).json({
            message: 'Error ' + error.message
        })
    }
}

module.exports = {
    registerCaptain,
    loginCaptain,
    captainProfile,
    captainLogout
}

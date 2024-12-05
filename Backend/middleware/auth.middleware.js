const User = require('../models/user.schema');
const Captain = require('../models/captain.schema')
const jwt = require('jsonwebtoken');
const blackListModal = require('../models/blackListToken.schema')
require('dotenv').config();

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        // const { token } = req.cookies;
        if (!token) {
            throw new Error("You are not login ")
        }
        const isBlackListed = await blackListModal.findOne({ token: token });
        if (isBlackListed) {
            throw new Error("Unauthorized")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);
        if (!user) {
            throw new Error('User not found and Authorized');
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(400).json({
            message: "Error : " + error.message
        })
    }
}
module.exports.authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error("You are not login ")
        }
        const isBlackListed = await blackListModal.findOne({ token: token });
        if (isBlackListed) {
            throw new Error("Unauthorized")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await Captain.findById(decoded._id);
        if (!captain) {
            throw new Error('User not found and Authorized');
        }
        req.user = captain;
        next();

    } catch (error) {
        res.status(400).json({
            message: "Error : " + error.message
        })
    }
}
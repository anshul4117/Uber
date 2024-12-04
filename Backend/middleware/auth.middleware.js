const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // const { token } = req.cookies;
        if (!token) {
            throw new Error("You are not login ")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

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
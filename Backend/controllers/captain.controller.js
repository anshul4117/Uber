const captainService = require('../services/captain.service');
const Captain = require('../models/captain.schema')
const { validateRegisterCaptainData } = require('../utils/validation');

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
        res.status(201).json({captain, token});
    } catch (error) {
        res.status(401).json({
            message: 'Error ' + error.message,
        });
    }
}

module.exports = {
    registerCaptain
}

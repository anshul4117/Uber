const Captain = require('../models/captain.schema');

module.exports.createCaptain = async ({
    fullName,
    email,
    password,
    vehicle
}) => {
    try {
        if (!(fullName.firstName || email || password || vehicle.color || vehicle.plate || vehicle.capacity || vehicle.vehicleType)) {
            throw new Error('All fields are required');
        }
        const captain = await Captain.create({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName
            },
            email,
            password,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        })
        return captain;
    } catch (error) {
        throw new Error("Error " + error.message)
    }
}
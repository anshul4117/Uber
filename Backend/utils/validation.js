const validator = require('validator');

const validateRegisterData = (req) => {
    const { fullName, email, password } = req.body;

    if (!(fullName.firstName)) {
        throw new Error('Name is not valid');
    }// else if (fullName.firstName.length < 4 || fullName.firstName.length > 30) {
    //     throw new Error('firstName should be 4-30 characters');
    // } else if (fullName.lastName.length < 4 || fullName.lastName.length > 30) {
    //     throw new Error('lastName should be 4-30 characters');
    // } 
    else if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not Strong');
    }
};

// create validation for user login
const validateLoginData = (req) => {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not Strong');
    }
}

const validateRegisterCaptainData = (req) => {
    // create allow vehicle array
    const allowVehicle = ['car', 'motorcycle', 'auto'];
    const { fullName, email, password, vehicle } = req.body;
    if (!(fullName.firstName)) {
        throw new Error('Name is not valid');
    } else if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not Strong');
    } else if (password.length < 5) {
        throw new Error('Password should be more than 5 characters');
    } else if (vehicle.color.length < 3) {
        throw new Error('Color should be more than 3 characters');
    } else if (vehicle.plate.length < 3) {
        throw new Error('Plate should be more than 3 characters');
    } else if (vehicle.capacity < 1) {
        throw new Error('Capacity should be more than 1');
    }
    else if (!allowVehicle.includes(vehicle.vehicleType.toLowerCase())) {
        throw new Error('Vehicle type is not valid');
    }
}

module.exports = {
    validateRegisterData,
    validateLoginData,
    validateRegisterCaptainData
}
const validator = require('validator');

const validateRegisterData = (req) => {
    const { fullName, email, password } = req.body;

    if (!(fullName.firstName || fullName.lastName)) {
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

module.exports = {
    validateRegisterData,
    validateLoginData
}
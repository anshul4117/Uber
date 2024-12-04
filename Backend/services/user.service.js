const User = require('../models/user.schema');

module.exports.createUser = async ({ fullName, email, password }) => {
    // const  = req.body;
    if (!(fullName.firstName || email || password)) {
        throw new Error('All filds are required')
    }
    // create usermodel
    const user = User.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password
    });
    return user
}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            // length
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    socketId: {
        type: String
    }
});

userSchema.methods.generateToken = async function () {
    try {
        const payload = {
            _id: this._id
        }
        const token = await jwt.sign(payload, process.env.JWT_SECRET);
        return token
    } catch (error) {
        throw new Error("Token generating failed " + error.message)
    }
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
        next();
    } else
        next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('User', userSchema);
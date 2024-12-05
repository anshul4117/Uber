const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            minLength: [3, "lastName must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate no must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            minLength: [1, "Capacity must be at least 1 "]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        },
        location: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
    }
});

captainSchema.methods.generateToken = async function () {
    try {
        const payload = {
            _id: this._id
        }
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
        return token
    } catch (error) {
        throw new Error("Token generating failed " + error.message)
    }
};

captainSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
        next();
    } else
        next();
});

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('Captain', captainSchema)
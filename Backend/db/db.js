const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.error("MongoDB connection Failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

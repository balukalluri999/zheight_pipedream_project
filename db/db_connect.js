// import mongoose and connect to MongoDB
const mongoose = require('mongoose');
// import dotenv to load environment variables

// Connect to MongoDB using the connection string from environment variables
const connectDB = async () => {
    try {
        const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@filestore.nzuclgq.mongodb.net/?retryWrites=true&w=majority&appName=filestore`
        const mongoconnect =  await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
        console.log('MongoDB connected successfully');
        return mongoconnect;
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

// Export the connectDB function to be used in other files
module.exports = connectDB;
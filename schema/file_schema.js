// create a fie schema for file uploads and store  relevant data in MongoDB
const mongoose = require('mongoose');

// Define the file schema
const fileSchema = new mongoose.Schema({
    buffer: {
        type: Buffer,
        required: true,
    },
    originalname: { 
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    id:{
        type: String,
        required: true,
    },
    email: {
        type: String,   
        required: true,
    }
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields        
}); 
// Create the model from the schema
const fileStore = mongoose.model('fileStore', fileSchema);
// Export the model to be used in other files
module.exports = fileStore;
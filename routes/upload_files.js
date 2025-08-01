const multer = require('multer');
const express = require('express');
const fileStore = require('../schema/file_schema.js');
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

// router for file uploads
const router = express.Router();

// Route to handle file uploads
router.post('/upload', upload.single('file'), async (req, res) => { 
    try {
        const { originalname, mimetype, size,buffer } = req.file;
        // const id = req.file.filename; // Use the filename as the ID
        console.log(req.file);
        const {id,email} = req.body; // Get email from request body

        // Create a new file document
        const newFile = new fileStore({
            buffer,
            originalname,
            mimetype,
            size,
            id,
            email
        });

        // Save the file document to MongoDB
        await newFile.save();

        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.error('File upload failed:', error);
        res.status(500).json({ message: 'File upload failed', error: error.message });
    }
});
// Route to get all uploaded files
router.get('/files', async (req, res) => {
    try {
        const files = await fileStore.find({});
        // files =
        res.status(200).json( files.map(file => ({
            id: file.id,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            email: file.email
        })));
    } catch (error) { 
        console.error('Failed to retrieve files:', error);
        res.status(500).json({ message: 'Failed to retrieve files', error: error.message });
    }
}
);

// Recieve file by ID and convert buffer to file and send
router.get('/files/:id', async (req, res) => {
    try {
        const file = await fileStore.findOne({ id: req.params.id });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.set({
            'Content-Type': file.mimetype,
            'Content-Length': file.size,
            'Content-Disposition': `attachment; filename="${file.originalname}"`
        });
        res.send(file.buffer);
    } catch (error) {
        console.error('Failed to retrieve file:', error);
        res.status(500).json({ message: 'Failed to retrieve file', error: error.message });
    }
});

// export module to use in other files
module.exports = router;


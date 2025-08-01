const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


// Load environment variables from .env file
dotenv.config();
// Import the connectDB function to establish a connection to MongoDB
const connectDB = require('./db/db_connect.js');



const app = express();


const port = process.env.port || 3000;

//Setup cors, allowing all origins, json, and urlencoded data, bodyparser
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uploadRoutes = require('./routes/upload_files.js');
app.use('/', express.static(__dirname + '/public'));
// Example route
app.get('/', (req, res) => {
    // res.send('Hello, world!');
    res.sendFile(__dirname + '/public/index.html');
    // send css and js files



});

app.get('/download', (req, res) => {
    res.sendFile(__dirname + '/public/display_files.html');
});


// Use the upload routes
app.use('/api', uploadRoutes);

// Connect to MongoDB
connectDB().then(() => {
    console.log('Connected to MongoDB');    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    // Connect to MongoDB when the server starts
    
});
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with failure
});
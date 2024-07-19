const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const uploadRoute = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fileuploads', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/upload', uploadRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

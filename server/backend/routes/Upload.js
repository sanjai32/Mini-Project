const express = require('express');
const multer = require('multer');
const File = require('../models/File');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Upload route
router.post('/', upload.single('file'), async (req, res) => {
    const { filename, path, size, mimetype } = req.file;

    try {
        const newFile = new File({
            filename,
            path,
            size,
            mimetype,
        });

        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading file' });
    }
});

module.exports = router;

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert(`File uploaded: ${response.data.file.filename}`);
            } catch (error) {
                alert('Error uploading file');
                console.error(error);
            }
        } else {
            alert('Please select a file first');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">React File Upload</h1>
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded p-6 text-center cursor-pointer mb-4 ${
                        isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50'
                    }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}

export default FileUpload;

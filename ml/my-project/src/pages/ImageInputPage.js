import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageInputPage = () => {
  const [imageURL, setImageURL] = useState('');
  const [outputImageURL, setOutputImageURL] = useState('');
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [numDetectedObjects, setNumDetectedObjects] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL);
  };

  const handleProcessImage = async () => {
    if (!file) return;
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('http://localhost:5000/process_image', {
        method: 'POST',
        body: formData,
      });
      const blob = await response.blob();
      const outputImageURL = URL.createObjectURL(blob);
      setOutputImageURL(outputImageURL);

      // Access response headers to get the number of detected objects
      const numObjectsHeader = response.headers.get('X-Num-Detected-Objects');
      if (numObjectsHeader) {
        setNumDetectedObjects(parseInt(numObjectsHeader));
      }
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {imageURL && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={imageURL} alt="Uploaded" className="max-w-full h-auto" />
          </motion.div>
        )}
        {file && (
          <p className="text-green-500 mb-4">Image uploaded successfully!</p>
        )}
        <button
          onClick={handleProcessImage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Process Image'}
        </button>
        {isProcessing && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </motion.div>
        )}
        {outputImageURL && (
          <div>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p>Number of detected objects: {numDetectedObjects}</p>
              <img
                src={outputImageURL}
                alt="Output"
                className="max-w-full h-auto"
              />
            </motion.div>
          </div>
        )}
        {imageURL && (
          <button
            onClick={() => {
              setImageURL('');
              setOutputImageURL('');
              setFile(null);
              setNumDetectedObjects(null);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageInputPage;

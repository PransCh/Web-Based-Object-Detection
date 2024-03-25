import React, { useState } from 'react';

const ImageInputPage = () => {
  const [imageURL, setImageURL] = useState('');
  const [outputImageURL, setOutputImageURL] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const imageURL = URL.createObjectURL(file);
    setImageURL(imageURL);
  };

  const handleProcessImage = async () => {
    if (!file) return;
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

      // Get the number of bounding boxes from the response headers
      
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Upload Image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        {imageURL && (
          <div className="mb-4">
            <img src={imageURL} alt="Uploaded" className="max-w-full h-auto" />
          </div>
        )}
        {file && <p className="text-green-500 mb-4">Image uploaded successfully!</p>}
        <button onClick={handleProcessImage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4">
          Process Image
        </button>
        {outputImageURL && (
          <div className="mb-4">
            <img src={outputImageURL} alt="Output" className="max-w-full h-auto" />
          </div>
        )}
        <button
          onClick={() => {
            setImageURL('');
            setOutputImageURL('');
            setFile(null);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ImageInputPage;
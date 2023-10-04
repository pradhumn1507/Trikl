import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('https://image-editor-rrgz.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadMessage(response.data.message);

      console.log('Image uploaded:', response.data.imageUrl);
      // You can handle the response as needed, such as displaying a success message.
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      <p>{uploadMessage}</p>
    </div>
  );
}

export default ImageUpload;

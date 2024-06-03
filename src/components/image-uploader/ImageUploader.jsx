import React, { useState } from 'react';

const ImageUploader = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type='file' accept='image/*' onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt='Preview'
          style={{ width: '200px', height: '200px' }}
        />
      )}
    </div>
  );
};

export default ImageUploader;

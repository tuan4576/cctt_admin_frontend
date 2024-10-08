
import React, { useState } from 'react';
import axiosInstance from '../../../api/axios';
import { API_URL } from '../../../api/config';

interface UploadResponse {
  url: string;
}

const UpIMG: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      axiosInstance.enableUploadFile();
      const response = await axiosInstance.post<UploadResponse>(`${API_URL}/upload`, formData);
      setUploadedImageUrl(response.data.url);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      axiosInstance.enableJson();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="mb-4"
      />
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="mb-4 max-w-full h-auto" />
      )}
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      {uploadedImageUrl && (
        <div className="mt-4">
          <p>Uploaded Image URL:</p>
          <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">
            {uploadedImageUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UpIMG;

import React, { useState } from 'react';
import apiCategory from '../../../api/apiCategory';

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiCategory.createCategory({ name: categoryName });
      // Handle successful creation (e.g., show success message, redirect)
      console.log('Category created successfully');
      setCategoryName(''); // Clear the input after successful creation
    } catch (error) {
      console.error('Error creating category:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tạo Danh Mục Mới</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
            Tên Danh Mục
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập tên danh mục"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Hủy
          </button>
          <button 
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Tạo Danh Mục
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
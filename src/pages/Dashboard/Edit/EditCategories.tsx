import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiCategory from '../../../api/apiCategory';

interface Category {
  id?: number;
  name: string;
  // Add other properties as needed
}

function EditCategories() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        try {
          const response = await apiCategory.getOne(parseInt(id));
          setCategory(response.data);
          console.log(response)
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category && id) {
      try {
        await apiCategory.editCategory(parseInt(id), category);
        // Handle successful update (e.g., show success message, redirect)
      } catch (error) {
        console.error('Error updating category:', error);
        // Handle error (e.g., show error message)
      }
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Chỉnh Sửa Danh Mục</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
            Tên Danh Mục
          </label>
          <input
            id="categoryName"
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập tên danh mục"
          />
        </div>
        <div className="flex items-center justify-between pt-4">
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
            Lưu Thay Đổi
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategories;

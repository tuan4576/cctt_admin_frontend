import axiosInstance from "./axios";

interface Category {
  // Define the structure of a category object
  id?: number;
  name: string;
  // Add other properties as needed
}

const apiCategory = {
  getAll: () => {
    return axiosInstance.get<Category[]>("/product/categories");
  },  

  getOne: (id: number) => {
    return axiosInstance.get<Category>(`/categories/${id}`);
  },

  getCategoryPagination: (page: number) => {
    return axiosInstance.get<{ data: Category[]; total: number; page: number }>(`categories?page=${page}`);
  },

  createCategory: (category: Omit<Category, 'id'>) => {
    return axiosInstance.post<Category>("/categories", category);
  },

  getCategoryById: (id: number) => {
    return axiosInstance.get<Category>(`/categories/${id}`);
  },

  editCategory: (id: number, category: Partial<Category>) => {
    return axiosInstance.put<Category>(`/categories/${id}`, category);
  },

  deleteCategoryById: (id: number) => {
    return axiosInstance.delete<void>(`/categories/${id}`);
  },
};

export default apiCategory;
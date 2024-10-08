// import axiosInstance from "./axios";

// interface Product {
//   id?: number;
//   name: string;
// }

// const apiProduct = {
//   createProduct: (data: Partial<Product>) => {
//     return axiosInstance.post<Product>(`/products`, data);
//   },

//   deleteProductById: (id: number) => {
//     return axiosInstance.delete<void>(`/products/${id}`);
//   },

//   getAll: () => {
//     return axiosInstance.get<Product[]>(`/products?populate=*`);
//   },
  
//   getIDAdmin: () => {
//     return axiosInstance.get<Product[]>(`/products/user`);
//   },

//   getProductPagination: (page: number, perPage: number) => {
//     return axiosInstance.get<{ data: Product[]; total: number; page: number }>(`products?page=${page}&perPage=${perPage}`);
//   },

//   getOne: (id: number) => {
//     return axiosInstance.get<Product>(`/products/${id}`);
//   },

//   getProductById: (id: number) => {
//     return axiosInstance.get<Product>(`/products/${id}`);
//   },

//   getProductByCatId: (catid: number, page: number) => {
//     return axiosInstance.get<{ data: Product[]; total: number; page: number }>(`products/categories/${catid}?page=${page}`);
//   },

//   getNewestTopSelling: (query: string) => {
//     return axiosInstance.get<Product[]>(`/products/${query}`);
//   },

//   getMostView: () => {
//     return axiosInstance.get<Product[]>(`/products`);
//   },

//   getProductBySearch: (name: string) => {
//     return axiosInstance.get<Product[]>(`/products/search/${name}`);
//   },
  
//   editProduct: (id: number, product: Partial<Product>) => {
//     return axiosInstance.put<Product>(`/products/${id}`, product);
//   },
// };

// export default apiProduct;

import axiosInstance from "./axios";

interface Product {
  id?: number;
  name: string;
}

const apiProduct = {
  getAll: () => {
    return axiosInstance.get<Product[]>(`/admin/products?populate=*`);
  },
  toggleProductStatus: (id: number) => {
    return axiosInstance.put<Product>(`/products/${id}/toggle-status`);
  },
  editProduct: (id: number, product: Partial<Product>) => {
    return axiosInstance.put<Product>(`/products/${id}`, product);
  },
  createProduct: (data: Partial<Product>) => {
    return axiosInstance.post<Product>(`/products`, data);
  },
  getOne: (id: number) => {
    return axiosInstance.get<Product>(`/products/${id}`);
  },
  deleteProductById: (id: number) => {
    return axiosInstance.delete<void>(`/products/${id}`);
  },
  updatePhoto: (id: number, formData: FormData) => {
    return axiosInstance.post<Product>(`/products/${id}/photo`, formData);
  },
  
  // getIDAdmin: () => {
  //   return axiosInstance.get<Product[]>(`/products/user`);
  // },

  // getProductPagination: (page: number, perPage: number) => {
  //   return axiosInstance.get<{ data: Product[]; total: number; page: number }>(`/products`, {
  //     params: { page, perPage },
  //   });
  // },


  // getProductByCatId: (catid: number, page: number) => {
  //   return axiosInstance.get<{ data: Product[]; total: number; page: number }>(`/products/categories/${catid}`, {
  //     params: { page },
  //   });
  // },

  // getNewestTopSelling: (query: string) => {
  //   return axiosInstance.get<Product[]>(`/products/${query}`);
  // },

  // getMostView: () => {
  //   return axiosInstance.get<Product[]>(`/products`);
  // },

  // getProductBySearch: (name: string) => {
  //   return axiosInstance.get<Product[]>(`/products/search/${name}`);
  // },
  

 
};

export default apiProduct;

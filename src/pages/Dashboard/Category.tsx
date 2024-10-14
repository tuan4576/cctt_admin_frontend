import React, { useEffect, useState } from 'react';
import apiCategory from "../../api/apiCategory";
import PaginationProduct from './Pagination/PaginationProduct';
import Successfully from './Notification/Successfully';
import Warning from './Notification/Warning';
import YesNoProduct from './Notification/YesNoProduct';
import Error from './Notification/Error';

interface Category {
  id?: number;
  name: string;
  productCount?: number;
  // Add other properties as needed
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        if (!token) {
          console.error('Token not found');
          // Redirect to login page or handle unauthorized access
          return;
        }

        const response = await apiCategory.getAll();

        if (Array.isArray(response.data)) {
          setCategories(response.data);
          setTotalItems(response.data.length);
          console.log(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setCategories([]);
          setTotalItems(0);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (error instanceof Error && 'response' in error && error.response?.status === 401) {
          console.log('Unauthorized access. Redirecting to login page...');
          // Add logic to redirect to login page here
        }
        setCategories([]);
        setTotalItems(0);
      }
    };

    fetchCategories();
  }, []);
  const handleDeleteCategory = async (id: number) => {
    try {
      await apiCategory.deleteCategoryById(id);
      // After successful deletion, update the categories list
      setCategories(categories.filter(category => category.id !== id));
      setTotalItems(prevTotal => prevTotal - 1);
      // toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      // toast.error('Failed to delete category');
    }
  };

  const handleDeleteSelected = async () => {
    const selectedCategories = categories.filter(c => c.selected);
    for (const category of selectedCategories) {
      if (category.id) {
        await handleDeleteCategory(category.id);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="font-[sans-serif] overflow-x-auto">
      <div className="p-4 mb-3 rounded flex justify-between items-center h-[60px]">
        <div style={{ visibility: categories.some(c => c.selected) ? 'visible' : 'hidden' }}>
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={handleDeleteSelected}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete Selected
          </button>
          <span className="text-blue-700 font-semibold ml-4">Selected items: {categories.filter(c => c.selected).length}</span>
        </div>
        <div className="flex items-center">
          <span className="text-blue-700 font-semibold mr-4">Total Categories: {categories.length}</span>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => window.location.href = '/createcategory'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Category
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/12">
              <input 
                type="checkbox" 
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={(e) => {
                  // Logic to select/deselect all categories
                  const newCategories = categories.map(c => ({...c, selected: e.target.checked}));
                  setCategories(newCategories);
                }}
              />
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/12">
              STT
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/12">
              ID
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-800 w-2/12">
              Category Name
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-800 w-2/12">
              Product Count
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-800 w-3/12">
              Image
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-800 w-2/12">
              Status
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-800 w-3/12">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {currentCategories.map((category, index) => (
            <tr key={category.id} className="even:bg-blue-50">
              <td className="p-4 text-sm text-black w-1/12">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={category.selected || false}
                  onChange={(e) => {
                    const newCategories = [...categories];
                    newCategories[indexOfFirstItem + index] = {...category, selected: e.target.checked};
                    setCategories(newCategories);
                  }}
                />
              </td>
              <td className="p-4 text-sm text-black w-1/12">
                {indexOfFirstItem + index + 1}
              </td>
              <td className="p-4 text-sm text-black w-1/12">
                {category.id}
              </td>
              <td className="p-4 text-sm text-black w-2/12">
                {category.name}
              </td>
              <td className="p-4 text-sm text-black w-2/12">
                {category.productCount || 0}
              </td>
              <td className="p-4 text-sm text-black w-3/12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              </td>
              <td className="p-4 text-sm text-black w-2/12">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
                </label>
              </td>
              <td className="p-4 w-3/12">
                <button className="mr-4" title="View">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-green-500 hover:fill-green-700" viewBox="0 0 24 24">
                    <path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"/>
                    <path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/>
                  </svg>
                </button>
                <button className="mr-4" title="Edit" onClick={() => window.location.href = `/editcategories/${category.id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
                    viewBox="0 0 348.882 348.882">
                    <path
                      d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                      data-original="#000000" />
                    <path
                      d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                      data-original="#000000" />
                  </svg>
                </button>
                <button className="mr-4" title="Delete" onClick={() => handleDeleteCategory(category.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                    <path
                      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                      data-original="#000000" />
                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                      data-original="#000000" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationProduct
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default CategoryList;


// import React, { useEffect, useState } from 'react';
//     import apiProduct from '../../api/apiProduct';
//     import { API_URL } from '../../Url/Url';

//     interface Product {
//       id?: number;
//       name: string;
//       email: string;
//       role: string;
//       joinedAt: string;
//       image?: string;
//       price?: number;
//       discount?: number;
//     }

//     const ProductList: React.FC = () => {
//       const [products, setProducts] = useState<Product[]>([]);

//       useEffect(() => {
//         const fetchUserProducts = async () => {
//           try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//               console.error('Token not found');
//               // Redirect to login page or handle unauthorized access
//               return;
//             }

//             const response = await apiProduct.getAll();

//             if (Array.isArray(response.data.data)) {
//               setProducts(response.data.data);
//             } else {
//               console.error('Unexpected response format:', response.data);
//               setProducts([]);
//             }
//           } catch (error) {
//             console.error('Error fetching user products:', error);
//             if (error instanceof Error && 'response' in error && error.response?.status === 401) {
//               console.log('Unauthorized access. Redirecting to login page...');
//               // Add logic to redirect to login page here
//             }
//             setProducts([]);
//           }
//         };

//         fetchUserProducts();
//       }, []);

//     return (
      // <div className="font-[sans-serif] overflow-x-auto">
      //   <div className="p-4 mb-3 rounded flex justify-between items-center h-[60px]">
      //     <div style={{ visibility: products.some(p => p.selected) ? 'visible' : 'hidden' }}>
      //       <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
      //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      //           <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      //         </svg>
      //         Delete Selected
      //       </button>
      //       <span className="text-blue-700 font-semibold ml-4">Selected items: {products.filter(p => p.selected).length}</span>
      //     </div>
      //     <div className="flex items-center">
      //       <span className="text-blue-700 font-semibold mr-4">Total Products: {products.length}</span>
      //       <button
      //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
      //         onClick={() => window.location.href = '/createproduct'}
      //       >
      //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      //           <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      //         </svg>
      //         Add Product
      //       </button>
      //     </div>
      //   </div>
      //   <table className="min-w-full bg-white">
      //     <thead className="bg-gray-800 whitespace-nowrap">
      //       <tr>
      //         <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/7">
      //           <input 
      //             type="checkbox" 
      //             className="form-checkbox h-5 w-5 text-blue-600"
      //             onChange={(e) => {
      //               // Logic to select/deselect all products
      //               const newProducts = products.map(p => ({...p, selected: e.target.checked}));
      //               setProducts(newProducts);
      //             }}
      //           />
      //         </th>
      //         <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/7">
      //           Số lượng
      //         </th>
      //         <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/7">
      //           Tên sản phẩm 
      //         </th>
      //         <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/7">
      //           Ảnh sản phẩm
      //         </th>
      //         <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/7">
      //           Trạng thái
      //         </th>
      //         <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/7">
      //           Tổng số sản phẩm
      //         </th>
      //         <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/7">
      //           Actions
      //         </th>
      //       </tr>
      //     </thead>

      //     <tbody className="whitespace-nowrap">
      //       {products.map((product, index) => (
      //         <tr key={product.id} className="even:bg-blue-50">
      //           <td className="p-4 text-sm text-black w-1/7">
      //             <input 
      //               type="checkbox" 
      //               className="form-checkbox h-5 w-5 text-blue-600"
      //               checked={product.selected || false}
      //               onChange={(e) => {
      //                 const newProducts = [...products];
      //                 newProducts[index] = {...product, selected: e.target.checked};
      //                 setProducts(newProducts);
      //               }}
      //             />
      //           </td>
      //           <td className="p-4 text-sm text-black w-1/7">
      //             {index + 1}
      //           </td>
      //           <td className="p-4 text-sm text-black w-1/7">
      //             {product.name}
      //           </td> 
      //           <td className="p-4 text-sm text-black w-1/7">
      //             {product.image ? (
      //               <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
      //             ) : (
      //               <span>No image</span>
      //             )}
      //           </td>
      //           <td className="p-4 text-sm text-black w-1/7">
      //             <label className="relative inline-flex items-center cursor-pointer">
      //               <input type="checkbox" value="" className="sr-only peer" />
      //               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      //               <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
      //             </label>
      //           </td>
      //           <td className="p-4 text-sm text-black w-1/7">
      //             {/* Placeholder for total product count */}
      //             {/* You might want to replace this with actual data */}
      //             100
      //           </td>
      //           <td className="p-4 w-1/7">
      //             <button className="mr-4" title="View">
      //               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-green-500 hover:fill-green-700" viewBox="0 0 24 24">
      //                 <path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"/>
      //                 <path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/>
      //               </svg>
      //             </button>
      //             <button className="mr-4" title="Edit">
      //               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
      //                 viewBox="0 0 348.882 348.882">
      //                 <path
      //                   d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
      //                   data-original="#000000" />
      //                 <path
      //                   d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
      //                   data-original="#000000" />
      //               </svg>
      //             </button>
      //             <button className="mr-4" title="Delete">
      //               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
      //                 <path
      //                   d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
      //                   data-original="#000000" />
      //                 <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
      //                   data-original="#000000" />
      //               </svg>
      //             </button>
      //           </td>
      //         </tr>
      //       ))}
      //     </tbody>
      //   </table>
        
      // </div>
//     );
//   };

//   export default ProductList;



//   <div className="md:flex m-4">
//   <p className="text-sm text-gray-500 flex-1">Hiển thị 1 đến 5 trong tổng số 100 mục</p>
//   <div className="flex items-center max-md:mt-4">
//     <p className="text-sm text-gray-500">Hiển thị</p>
//     <select className="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none">
//       <option>5</option>
//       <option>10</option>
//       <option>20</option>
//       <option>50</option>
//       <option>100</option>
//     </select>
//     <ul className="flex space-x-1 ml-2">
//       <li className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
//           <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" data-original="#000000" />
//         </svg>
//       </li>
//       <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
//         1
//       </li>
//       <li className="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded">
//         2
//       </li>
//       <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
//         3
//       </li>
//       <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
//         4
//       </li>
//       <li className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
//         <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
//           <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" data-original="#000000" />
//         </svg>
//       </li>
//     </ul>
//   </div>
// </div>
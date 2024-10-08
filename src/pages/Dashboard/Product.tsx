

// import { NavLink } from 'react-router-dom';
// import apiProduct from '../../api/apiProduct';
// import { useState, useEffect } from 'react';

// function Product() {
//   interface Product {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
//     category: string;
//     quantity: number;
//   }
//   const [products, setProducts] = useState<Product[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [perPage, setPerPage] = useState(10);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await apiProduct.getIDAdmin({
//           params: { page: currentPage, perPage: perPage }
//         });
//         console.log('API Response:', response.data); // Log the entire response
//         if (response && response.data) {
//           console.log('Products:', response.data.data);
//           console.log('Total Pages:', response.data.last_page);
//           console.log('Current Page:', response.data.current_page);
//           setProducts(response.data.data);
//           setTotalPages(response.data.last_page);
//           setCurrentPage(response.data.current_page);
//         } else {
//           console.error('API response is not in the expected format:', response);
//           setProducts([]);
//         }
//       } catch (error) {
//         if (error instanceof Error) {
//           console.error('Error fetching products:', error.message);
//         } else {
//           console.error('An unknown error occurred while fetching products');
//         }
//         setProducts([]);
//       }
//     };
  
//     fetchProducts();
//   }, [currentPage, perPage]);

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//   };

//   const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   // Calculate the products to display based on current page and perPage
//   const displayedProducts = products.slice((currentPage - 1) * perPage, currentPage * perPage);

//   return (
//     <>
//     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <div className="flex justify-between items-center mb-6">
//         <h4 className="text-xl font-semibold text-black dark:text-white">
//           Quản lý sản phẩm
//         </h4>
//         <div className="flex items-center">
//           <button
//             id="deleteButton"
//             className="hidden rounded-md bg-meta-1 py-2 px-4 text-white transition duration-300 ease-in-out hover:bg-opacity-90 hover:scale-105 active:bg-opacity-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-meta-1 focus:ring-opacity-50 mr-3.5"
//           >
//             <svg
//               className="fill-current"
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
//                 fill=""
//               />
//             </svg>
//           </button>
//           <NavLink
//             to="/createproduct"
//             className="rounded-md bg-primary py-2 px-4 text-white transition duration-300 ease-in-out hover:bg-opacity-90 hover:scale-105 active:bg-opacity-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 mr-2"
//           >
//             Thêm sản phẩm
//           </NavLink>
//         </div>
//       </div>
      
//       <div className="flex flex-col">
//         <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               ID
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <input
//               type="checkbox"
//               className="w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded"
//               onChange={(e) => {
//                 const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
//                 checkboxes.forEach((checkbox) => {
//                   checkbox.checked = e.target.checked;
//                 });
//                 const deleteButton = document.getElementById('deleteButton');
//                 if (deleteButton) {
//                   deleteButton.style.display = e.target.checked ? 'inline-flex' : 'none';
//                 }
//               }}
//             />
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Hình ảnh
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Tên
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Danh mục
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Giá
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Số lượng
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Thao tác
//             </h5>
//           </div>
//         </div>

//         {Array.isArray(products) && products.map((product, index) => (
//           <div key={product.id} className="grid grid-cols-8 border-b border-stroke dark:border-strokedark">
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               <p className="hidden text-black dark:text-white sm:block">{index + 1}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4 cursor-pointer bg-blue-500 border border-gray-400 rounded"
//                 onChange={(e) => {
//                   const deleteButton = document.getElementById('deleteButton');
//                   if (deleteButton) {
//                     deleteButton.style.display = e.target.checked ? 'inline-flex' : 'none';
//                   }
//                 }}
//               />
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-12 h-12 shrink-0 bg-gray-100"
//               />
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{product.name}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-meta-3">{product.category}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{product.price.toLocaleString()}đ</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{product.quantity}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <button className="mr-2 transition duration-300 ease-in-out hover:scale-125 focus:outline-none active:scale-95">
//                 <svg
//                   className="fill-current text-primary"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 18 18"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.17812 8.99981 3.17812C14.5686 3.17812 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
//                     fill=""
//                   />
//                   <path
//                     d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
//                     fill=""
//                   />
//                 </svg>
//               </button>
//               <NavLink to={`/editproduct/${product.id}`} className="mr-2 transition duration-300 ease-in-out hover:scale-125 focus:outline-none active:scale-95">
//                 <svg
//                   className="fill-current text-primary"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 18 18"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M16.862 2.05132L15.9487 1.13814C15.1906 0.379971 13.9483 0.379971 13.1902 1.13814L3.68982 10.6384C3.58008 10.7482 3.5 10.8877 3.45264 11.0432L2.05078 15.9491C1.9877 16.1701 2.04297 16.4085 2.20117 16.5667C2.3209 16.6865 2.48203 16.7495 2.64609 16.7495C2.70137 16.7495 2.75664 16.7417 2.81191 16.7261L7.71777 15.3243C7.87324 15.2769 8.01289 15.1968 8.12266 15.0871L17.6231 5.58679C18.3812 4.82862 18.3812 3.58679 17.6231 2.82862L16.862 2.05132ZM7.36621 14.1986L3.69277 15.2925L4.77871 11.6269L12.8906 3.51503L14.4619 5.08639L7.36621 14.1986ZM16.5352 4.49882L15.5 5.53413L13.9287 3.96277L14.9639 2.92745C15.2139 2.67745 15.9287 2.67745 16.1787 2.92745L17.0919 3.84062C17.3341 4.08288 17.3341 4.79882 16.5352 4.49882Z"
//                     fill=""
//                   />
//                 </svg>
//               </NavLink>
//               <button className="transition duration-300 ease-in-out hover:scale-125 focus:outline-none active:scale-95">
//                 <svg
//                   className="fill-current text-meta-1"
//                   width="18"
//                   height="18"
//                   viewBox="0 0 18 18"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
//                     fill=""
//                   />
//                   <path
//                     d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
//                     fill=""
//                   />
//                   <path
//                     d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
//                     fill=""
//                   />
//                   <path
//                     d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
//                     fill=""
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//     </div>
//     </>
//   )
// }

// export default Product





{/* <div className="grid grid-cols-8 border-b border-stroke dark:border-strokedark">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="hidden text-black dark:text-white sm:block">1</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer bg-blue-500 border border-gray-400 rounded"
              onChange={(e) => {
                const deleteButton = document.getElementById('deleteButton');
                if (deleteButton) {
                  deleteButton.style.display = e.target.checked ? 'inline-flex' : 'none';
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <img
              src="https://readymadeui.com/product_img_1.webp"
              alt="Product Image"
              className="w-12 h-12 shrink-0 bg-gray-100"
            />
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">iPhone 13 Pro</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">Điện tử</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">21.000.000đ</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">50</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <button className="mr-2 transition duration-300 ease-in-out hover:scale-125 focus:outline-none active:scale-95">
              <svg
                className="fill-current text-primary"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.17812 8.99981 3.17812C14.5686 3.17812 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                  fill=""
                />
                <path
                  d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                  fill=""
                />
              </svg>
            </button>
            <NavLink to="/editproduct" className="mr-2 transition duration-300 ease-in-out hover:scale-125 focus:outline-none active:scale-95">
              <svg
                className="fill-current text-primary"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.862 2.05132L15.9487 1.13814C15.1906 0.379971 13.9483 0.379971 13.1902 1.13814L3.68982 10.6384C3.58008 10.7482 3.5 10.8877 3.45264 11.0432L2.05078 15.9491C1.9877 16.1701 2.04297 16.4085 2.20117 16.5667C2.3209 16.6865 2.48203 16.7495 2.64609 16.7495C2.70137 16.7495 2.75664 16.7417 2.81191 16.7261L7.71777 15.3243C7.87324 15.2769 8.01289 15.1968 8.12266 15.0871L17.6231 5.58679C18.3812 4.82862 18.3812 3.58679 17.6231 2.82862L16.862 2.05132ZM7.36621 14.1986L3.69277 15.2925L4.77871 11.6269L12.8906 3.51503L14.4619 5.08639L7.36621 14.1986ZM16.5352 4.49882L15.5 5.53413L13.9287 3.96277L14.9639 2.92745C15.2139 2.67745 15.9287 2.67745 16.1787 2.92745L17.0919 3.84062C17.3341 4.08288 17.3341 4.79882 16.5352 4.49882Z"
                  fill=""
                />
              </svg>
            </NavLink>
            <button className="transition duration-300 ease-in-out hover:scale-125 focus:outline-none active:scale-95">
              <svg
                className="fill-current text-meta-1"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                  fill=""
                />
                <path
                  d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                  fill=""
                />
                <path
                  d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                  fill=""
                />
                <path
                  d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div> */}
        
          




        //--------------------------------------

// useEffect(() => {
    //   const fetchProducts = async () => {
    //     try {
    //       const token = localStorage.getItem('token'); // Lấy token từ localStorage
    //       if (!token) {
    //         console.error('Không tìm thấy token');
    //         return;
    //       }

    //       const response = await apiProduct.getIDAdmin();
    //       setProducts(response.data.data);
    //     } catch (error) {
    //       console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    //       if (error instanceof Error && 'response' in error && error.response?.status === 401) {
    //         console.log('Truy cập không được ủy quyền. Chuyển hướng đến trang đăng nhập...');
    //         // Thêm logic chuyển hướng đến trang đăng nhập ở đây
    //       }
    //     }
    //   };

    //   fetchProducts();
    // }, []);

    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     try {
    //       const response = await apiProduct.getAll();
    //       if (response.data && Array.isArray(response.data.data)) {
    //         setProducts(response.data.data);
    //       } else {
    //         console.error('Unexpected response format:', response.data);
    //         setProducts([]);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching products:', error);
    //       setProducts([]);
    //     }
    //   };

    //   fetchProducts();
    // }, []);




          // const toggleProductStatus = async (productId: number) => {
      //   try {
      //     await apiProduct.toggleProductStatus(productId);
      //     setProducts(products.map(product => 
      //       product.id === productId ? {...product, status: product.status === 1 ? 0 : 1} : product
      //     ));
      //   } catch (error) {
      //     console.error('Error updating product status:', error);
      //   }
      // };
    import React, { useEffect, useState } from 'react';
    import apiProduct from '../../api/apiProduct';
    import { IMG_URL } from '../../api/config';
    import { showYesNoProduct } from './Notification/YesNoProduct';
    import PaginationProduct from './Pagination/PaginationProduct';
    interface Product {
      id?: number;
      name: string;
      email: string;
      role: string;
      joinedAt: string;
      image?: string;
      price?: number;
      discount?: number;
      status?: number;
      category?: {
        name: string;
      };
      stocks?: Array<{
        quantity?: number;
      }>;
    }

    const ProductList: React.FC = () => {
      const [products, setProducts] = useState<Product[]>([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
      const [totalItems, setTotalItems] = useState(0);

      useEffect(() => {
        const fetchUserProducts = async () => {
          try {
            const token = localStorage.getItem('admin_token');
            if (!token) {
              console.error('Token not found');
              // Redirect to login page or handle unauthorized access
              return;
            }

            const response = await apiProduct.getAll();

            if (Array.isArray(response.data.data)) {
              setProducts(response.data.data);
              setTotalItems(response.data.data.length);
              console.log(response.data.data);
            } else {
              console.error('Unexpected response format:', response.data);
              setProducts([]);
            }
          } catch (error) {
            console.error('Error fetching user products:', error);
            if (error instanceof Error && 'response' in error && error.response?.status === 401) {
              console.log('Unauthorized access. Redirecting to login page...');
              // Add logic to redirect to login page here
            }
            setProducts([]);
          }
        };

        fetchUserProducts();
      }, []);


      const [productToToggle, setProductToToggle] = useState<number | null>(null);

      useEffect(() => {
        if (productToToggle !== null) {
          const confirmToggle = async () => {
            showYesNoProduct(
              "Xác nhận thay đổi trạng thái sản phẩm?",
              async () => {
                try {
                  await apiProduct.toggleProductStatus(productToToggle);
                  setProducts(products.map(product => 
                    product.id === productToToggle ? {...product, status: product.status === 1 ? 0 : 1} : product
                  ));
                } catch (error) {
                  console.error('Error updating product status:', error);
                }
                setProductToToggle(null);
              },
              () => {
                setProductToToggle(null);
              }
            );
          };

          confirmToggle();
        }
      }, [productToToggle, products]);

      const toggleProductStatus = (productId: number) => {
        setProductToToggle(productId);
      };

      const deleteProduct = async (productId: number) => {
        showYesNoProduct(
          "Bạn có chắc chắn muốn xóa sản phẩm này?",
          async () => {
            try {
              await apiProduct.deleteProductById(productId);
              setProducts(products.filter(product => product.id !== productId));
              setTotalItems(prevTotal => prevTotal - 1);
            } catch (error) {
              console.error('Error deleting product:', error);
            }
          },
          () => {
            // Do nothing if user cancels
          }
        );
      };

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

      const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
      };

      // Calculate the products to display based on current page and items per page
      const indexOfLastProduct = currentPage * itemsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
      const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <div className="font-[sans-serif] overflow-x-auto">
        <div className="p-4 mb-3 rounded flex justify-between items-center h-[60px]">
          <div style={{ visibility: products.some(p => p.selected) ? 'visible' : 'hidden' }}>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Delete Selected
            </button>
            <span className="text-blue-700 font-semibold ml-4">Selected items: {products.filter(p => p.selected).length}</span>
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => window.location.href = '/createproduct'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm sản phẩm
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-5 w-5 text-blue-600"
                  onChange={(e) => {
                    // Logic to select/deselect all products
                    const newProducts = products.map(p => ({...p, selected: e.target.checked}));
                    setProducts(newProducts);
                  }}
                />
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                STT
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                ID SP
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                Tên SP
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                Ảnh SP
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                Giá SP
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                Giảm giá
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                Loại
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                Trạng thái
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                Trong kho
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-800 w-1/11">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {currentProducts.map((product, index) => (
              <tr key={product.id} className="even:bg-blue-50">
                <td className="p-4 text-sm text-black w-1/11">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={product.selected || false}
                    onChange={(e) => {
                      const newProducts = [...products];
                      const productIndex = indexOfFirstProduct + index;
                      newProducts[productIndex] = {...product, selected: e.target.checked};
                      setProducts(newProducts);
                    }}
                  />
                </td>
                <td className="p-4 text-sm text-black w-1/11">
                  {indexOfFirstProduct + index + 1}
                </td>
                <td className="p-4 text-sm text-black w-1/11">
                  {product.id}
                </td>
                <td className="p-4 text-sm text-black w-1/11">
                  {product.name}
                </td> 
                <td className="p-4 text-sm text-black w-1/11">
                  {product.photo ? (
                    <img src={`${IMG_URL}/image/${product.photo}`} alt={product.name} className="w-16 h-16 object-cover" />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="p-4 text-sm text-black w-1/11">
                  {product.price ? `${product.price} đ` : 'N/A'}
                </td>
                <td className="p-4 text-sm text-black w-1/11">
                  {product.discount ? `${product.discount} đ` : 'N/A'}
                </td>
                <td className="p-4 text-sm text-black w-1/11">
                  {product.category?.name || 'N/A'}
                </td>
                <td className="p-4 text-sm text-black w-1/11">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={product.status === 1}
                      onChange={() => toggleProductStatus(product.id!)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {product.status === 1 ? 'Đang bán' : 'Ngừng bán'}
                    </span>
                  </label>
                </td>
                <td className="p-4 text-sm text-black w-1/11">
                  {/* Display total quantity from stocks array */}
                  {product.stocks && product.stocks.length > 0
                    ? product.stocks.reduce((total, stock) => total + (stock.quantity || 0), 0)
                    : 'N/A'}
                </td>
                <td className="p-4 w-1/11">
                  <button className="mr-4" title="View" onClick={() => window.location.href = `/productdetail/${product.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-green-500 hover:fill-green-700" viewBox="0 0 24 24">
                      <path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"/>
                      <path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/>
                    </svg>
                  </button>
                  <button className="mr-4" title="Edit" onClick={() => window.location.href = `/editproduct/${product.id}`}>
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
                  <button className="mr-4" title="Delete" onClick={() => deleteProduct(product.id!)}>
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

  export default ProductList;

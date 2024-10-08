import React, { useState, useEffect, useRef } from 'react';
import apiProduct from '../../../api/apiProduct';
import apiCategory from '../../../api/apiCategory';
import { useParams, useNavigate } from 'react-router-dom';
import { IMG_URL } from '../../../api/config';
import Successfully from '../Notification/Successfully';
import Error from '../Notification/Error';
import Warning from '../Notification/Warning';

interface Product {
  id?: number;
  name: string;
  price: number;
  discount: number;
  photo: File | null;
  category_id: number;
  brand: string;
  description: string;
  details: string;
}

function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    discount: 0,
    photo: null,
    category_id: 0,
    brand: '',
    description: '',
    details: ''
  });
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiCategory.getAll();
        setCategories(response.data);
      } catch (error) {
        // console.error('Error fetching categories:', error);
        setShowError(true);
        setMessage('Lỗi khi tải danh mục sản phẩm');
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await apiProduct.getOne(Number(id));
        setProduct(response.data);
      } catch (error) {
        // console.error('Error fetching product:', error);
        setShowError(true);
        setMessage('Lỗi khi tải thông tin sản phẩm');
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...product,
        price: Number(product.price),
        discount: Number(product.discount),
        category_id: Number(product.category_id)
      };
      
      const response = await apiProduct.editProduct(Number(id), updatedProduct);
      console.log('Product updated:', response.data);
      setShowSuccess(true);
      setMessage('Cập nhật sản phẩm thành công');
      setTimeout(() => navigate('/product'), 2000);
    } catch (error) {
      // console.error('Error updating product:', error);
      setShowError(true);
      setMessage('Lỗi khi cập nhật sản phẩm');
    }
  };

  const handlePhotoUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPhoto) {
      setShowWarning(true);
      setMessage('Vui lòng chọn ảnh mới để cập nhật');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('photo', newPhoto);
      
      const response = await apiProduct.updatePhoto(Number(id), formData);
      console.log('Photo updated:', response.data);
      setShowSuccess(true);
      setMessage('Cập nhật ảnh sản phẩm thành công');
    } catch (error) {
      // console.error('Error updating photo:', error);
      setShowError(true);
      setMessage('Lỗi khi cập nhật ảnh sản phẩm');
    }
  };

  const handleCancelPhotoUpdate = () => {
    setNewPhoto(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
   <>
    {showSuccess && <Successfully message={message} />}
    {showError && <Error message={message} />}
    {showWarning && <Warning message={message} />}
    <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Chỉnh Sửa Sản Phẩm
        </h4>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Tên Sản Phẩm
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Danh Mục
            </label>
            <select
              name="category_id"
              value={product.category_id}
              onChange={handleInputChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="">Chọn danh mục</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Giá
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Nhập giá"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Giảm Giá
          </label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
            placeholder="Nhập giảm giá"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Chi Tiết Sản Phẩm
          </label>
          <textarea
            name="details"
            value={product.details}
            onChange={handleInputChange}
            rows={6}
            placeholder="Nhập chi tiết sản phẩm"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          ></textarea>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Mô Tả
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            rows={6}
            placeholder="Nhập mô tả sản phẩm"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          ></textarea>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Thương Hiệu
          </label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            placeholder="Nhập thương hiệu"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mb-8">
          Cập Nhật Sản Phẩm
        </button>
      </form>

      <div className="mt-8 border-t border-stroke pt-8 dark:border-strokedark">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Cập Nhật Ảnh Sản Phẩm
        </h4>
        <form onSubmit={handlePhotoUpdate}>
          <div className="mb-4.5 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <label className="mb-2.5 block text-black dark:text-white">
                Ảnh sản phẩm
              </label>
              {product.photo && !previewUrl && (
                <img 
                  src={`${IMG_URL}/image/${product.photo}`} 
                  alt="Current product image" 
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Preview of new product image" 
                  className="w-24 h-24 object-cover rounded"
                />
              )}
            </div>
            <div className="flex-grow">
              <label htmlFor="fileInput" className="cursor-pointer flex items-center justify-center w-full h-24 rounded-lg border-2 border-dashed border-primary bg-gray hover:bg-opacity-80 dark:bg-meta-4 dark:hover:bg-opacity-80">
                <div className="flex flex-col items-center">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 16.5H22.5" stroke="#3C50E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 12V21" stroke="#3C50E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M33 18C33 26.2843 26.2843 33 18 33C9.71573 33 3 26.2843 3 18C3 9.71573 9.71573 3 18 3C26.2843 3 33 9.71573 33 18Z" stroke="#3C50E0" strokeWidth="2"/>
                  </svg>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Thêm ảnh để cập nhật cho sản phẩm</span>
                </div>
              </label>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            {previewUrl && (
              <button
                type="button"
                onClick={handleCancelPhotoUpdate}
                className="flex justify-center rounded bg-danger p-3 font-medium text-gray"
              >
                Hủy
              </button>
            )}
            <button type="submit" className="flex justify-center rounded bg-primary p-3 font-medium text-gray">
              Cập Nhật Ảnh
            </button>
          </div>
        </form>
      </div>
    </div>
   </>
  )
}

export default EditProduct
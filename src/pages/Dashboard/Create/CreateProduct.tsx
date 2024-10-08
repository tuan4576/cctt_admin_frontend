import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiProduct from '../../../api/apiProduct';
import apiCategory from '../../../api/apiCategory';
import Successfully from '../Notification/Successfully';
import Error from '../Notification/Error';
import Warning from '../Notification/Warning';
interface Product {
  name: string;
  price: number;
  discount: number;
  photo: File | null;
  category_id: number;
  status: number;
  quantity: number;
  size: string;
  color: string;
  brand: string;
  description: string;
  details: string;
}

function CreateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    discount: 0,
    photo: null,
    category_id: 0,
    status: 0,
    quantity: 0,
    size: '',
    color: '',
    brand: '',
    description: '',
    details: ''
  });
  const [priceInWords, setPriceInWords] = useState('');
  const [discountInWords, setDiscountInWords] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [discountInput, setDiscountInput] = useState('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiCategory.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setShowError(true);
        setNotificationMessage('Lỗi khi tải danh mục sản phẩm');
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
      handlePriceChange(value);
    } else if (name === 'discount') {
      handleDiscountChange(value);
    } else if (name === 'category_id' || name === 'status') {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: parseInt(value, 10)
      }));
    } else if (name === 'photo') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        setProduct(prevProduct => ({
          ...prevProduct,
          photo: file
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    }
  };

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = Number(numericValue).toLocaleString('vi-VN');
    setPriceInput(formattedValue);

    const price = parseFloat(numericValue);
    setProduct(prevProduct => ({
      ...prevProduct,
      price: isNaN(price) ? 0 : price
    }));

    setPriceInWords(convertNumberToWords(price));
  };

  const handleDiscountChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = Number(numericValue).toLocaleString('vi-VN');
    setDiscountInput(formattedValue);

    const discount = parseFloat(numericValue);
    setProduct(prevProduct => ({
      ...prevProduct,
      discount: isNaN(discount) ? 0 : discount
    }));

    setDiscountInWords(convertNumberToWords(discount));
  };

  const handleClearInput = (name: string) => {
    if (name === 'price') {
      setPriceInput('');
      setPriceInWords('');
    } else if (name === 'discount') {
      setDiscountInput('');
      setDiscountInWords('');
    } else if (name === 'photo') {
      setProduct(prevProduct => ({
        ...prevProduct,
        photo: null
      }));
      setPreviewImage(null);
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (key === 'photo' && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value !== 'object') {
          formData.append(key, String(value));
        }
      });
      
      const response = await apiProduct.createProduct(formData);
      setShowSuccess(true);
      setNotificationMessage('Sản phẩm đã được tạo thành công');
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Validation error:', error.response.data);
        setShowWarning(true);
        setNotificationMessage('Vui lòng kiểm tra lại thông tin sản phẩm');
        // Handle validation errors (e.g., display error messages to the user)
      } else {
        console.error('Error creating product:', error);
        setShowError(true);
        setNotificationMessage('Đã xảy ra lỗi khi tạo sản phẩm');
        // Handle other types of errors
      }
    }
  };

  const convertNumberToWords = (number: number): string => {
    const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
    
    if (number === 0) return 'không đồng';
    if (number < 0) return 'số âm';

    let words = '';

    if (number >= 1000000000) {
      const billions = Math.floor(number / 1000000000);
      words += convertNumberToWords(billions) + ' tỷ ';
      number %= 1000000000;
    }

    if (number >= 1000000) {
      const millions = Math.floor(number / 1000000);
      words += convertNumberToWords(millions) + ' triệu ';
      number %= 1000000;
    }

    if (number >= 1000) {
      const thousands = Math.floor(number / 1000);
      words += convertNumberToWords(thousands) + ' nghìn ';
      number %= 1000;
      
      // If the remaining number is 0, we don't need to process further
      if (number === 0) {
        return words.trim() + ' đồng';
      }
    }

    if (number >= 100) {
      const hundreds = Math.floor(number / 100);
      words += units[hundreds] + ' trăm ';
      number %= 100;
    }

    if (number >= 10) {
      const tensDigit = Math.floor(number / 10);
      const onesDigit = number % 10;

      if (tensDigit === 1) {
        words += 'mười ';
        if (onesDigit === 5) {
          words += 'lăm ';
        } else if (onesDigit > 0) {
          words += units[onesDigit] + ' ';
        }
      } else {
        words += tens[tensDigit] + ' ';
        if (onesDigit === 1) {
          words += 'mốt ';
        } else if (onesDigit === 5) {
          words += 'lăm ';
        } else if (onesDigit > 0) {
          words += units[onesDigit] + ' ';
        }
      }
    } else if (number > 0) {
      words += units[number] + ' ';
    }

    // Remove trailing spaces and add 'đồng'
    words = words.trim();
    words += ' ';

    return words;
  };

  return (
    <>
    <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Tạo Sản Phẩm Mới
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
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Tên Sản Phẩm
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pr-10"
            />
            {product.name && (
              <button
                type="button"
                onClick={() => handleClearInput('name')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Thương Hiệu
          </label>
          <div className="relative">
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              placeholder="Nhập thương hiệu"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pr-10"
            />
            {product.brand && (
              <button
                type="button"
                onClick={() => handleClearInput('brand')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Mô Tả
          </label>
          <div className="relative">
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
              rows={4}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pr-10"
            ></textarea>
            {product.description && (
              <button
                type="button"
                onClick={() => handleClearInput('description')}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Chi Tiết Sản Phẩm
          </label>
          <div className="relative">
            <textarea
              name="details"
              value={product.details}
              onChange={handleInputChange}
              placeholder="Nhập chi tiết sản phẩm"
              rows={6}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pr-10"
            ></textarea>
            {product.details && (
              <button
                type="button"
                onClick={() => handleClearInput('details')}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Ảnh Sản Phẩm
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <label htmlFor="fileInput" className="cursor-pointer flex items-center justify-center w-full h-24 rounded-lg border-2 border-dashed border-primary bg-gray hover:bg-opacity-80 dark:bg-meta-4 dark:hover:bg-opacity-80">
                <div className="flex flex-col items-center">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 16.5H22.5" stroke="#3C50E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 12V21" stroke="#3C50E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M33 18C33 26.2843 26.2843 33 18 33C9.71573 33 3 26.2843 3 18C3 9.71573 9.71573 3 18 3C26.2843 3 33 9.71573 33 18Z" stroke="#3C50E0" strokeWidth="2"/>
                  </svg>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">Thêm ảnh sản phẩm</span>
                </div>
              </label>
              <input
                id="fileInput"
                type="file"
                name="photo"
                onChange={handleInputChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex-shrink-0">
              {previewImage ? (
                <div className="relative w-24 h-24">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleClearInput('photo')}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-sm">Chưa có ảnh</span>
                </div>
              )}
            </div>
          </div>
        </div>
              
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Giá
            </label>
            <div className="relative">
              <input
                type="text"
                name="price"
                value={priceInput}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="Nhập giá"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pr-16"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">VNĐ</span>
              {priceInput && (
                <button
                  type="button"
                  onClick={() => handleClearInput('price')}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="h-6 mt-2">
              {priceInWords && (
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {priceInWords}
                </p>
              )}
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Giảm Giá
            </label>
            <div className="relative">
              <input
                type="text"
                name="discount"
                value={discountInput}
                onChange={(e) => handleDiscountChange(e.target.value)}
                placeholder="Nhập giảm giá"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pr-16"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">VNĐ</span>
              {discountInput && (
                <button
                  type="button"
                  onClick={() => handleClearInput('discount')}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="h-6 mt-2">
              {discountInWords && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  {discountInWords}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Loại <span className="text-meta-1">*</span>
          </label>
          <select 
            name="category_id"
            value={product.category_id}
            onChange={handleInputChange}
            className={`w-full rounded border-[1.5px] ${product.category_id ? 'border-stroke' : 'border-meta-1'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
            required
          >
            <option value="">Chọn loại sản phẩm</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {!product.category_id && (
            <p className="text-meta-1 text-sm mt-1">Vui lòng chọn loại sản phẩm</p>
          )}
        </div>

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Trạng Thái
            </label>
            <select 
              name="status"
              value={product.status}
              onChange={handleInputChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="">Chọn trạng thái</option>
              <option value="1">Đang bán</option>
              <option value="0">Ngừng bán</option>
            </select>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Số Lượng Trong Kho
            </label>
            <div className="relative">
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                placeholder="Nhập số lượng trong kho"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary pr-10"
              />
              {product.quantity > 0 && (
                <button
                  type="button"
                  onClick={() => handleClearInput('quantity')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Kích Thước
            </label>
            <div className="relative">
              <input
                type="text"
                name="size"
                value={product.size}
                onChange={handleInputChange}
                placeholder="Nhập kích thước (cách nhau bằng dấu phẩy)"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {product.size && (
                <button
                  type="button"
                  onClick={() => handleClearInput('size')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Màu Sắc
            </label>
            <div className="relative">
              <input
                type="text"
                name="color"
                value={product.color}
                onChange={handleInputChange}
                placeholder="Nhập màu sắc (cách nhau bằng dấu phẩy)"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {product.color && (
                <button
                  type="button"
                  onClick={() => handleClearInput('color')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mb-8">
          Tạo Sản Phẩm
        </button>
      </form>
    </div>
    {showSuccess && (
      <Successfully message={notificationMessage} onClose={() => setShowSuccess(false)} />
    )}
    {showError && (
      <Error message={notificationMessage} onClose={() => setShowError(false)} />
    )}
    {showWarning && (
      <Warning message={notificationMessage} onClose={() => setShowWarning(false)} />
    )}
    </>
  )
}

export default CreateProduct
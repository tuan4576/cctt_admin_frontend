import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiProduct from '../../../api/apiProduct';
import { IMG_URL } from '../../../api/config';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  photo: string;
  category_id: number;
  status: number;
  quantity: number;
  size: string;
  color: string;
  brand: string;
  description: string;
  details: string;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiProduct.getOne(Number(id));
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
      >
        &larr; Quay lại
      </button>
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800 shadow-text">Chi tiết sản phẩm</h1>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4">
            {product.photo && (
              <img 
                src={`${IMG_URL}/image/${product.photo}`} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
          <div className="md:w-2/3 p-8">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4">{product.name}</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-2">Giá:</p>
                <p className="text-2xl font-bold text-indigo-600">{product.price.toLocaleString()} đ</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Giảm giá:</p>
                <p className="text-2xl font-bold text-green-500">{product.discount.toLocaleString()} đ</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Thương hiệu:</p>
                <p className="text-xl font-semibold text-indigo-800">{product.brand}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Trạng thái:</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  product.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 1 ? 'Đang bán' : 'Ngừng bán'}
                </span>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Danh mục:</p>
                <p className="text-xl font-semibold text-indigo-800">{product.category?.name || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 p-8">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Mô tả sản phẩm</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
        <div className="bg-indigo-50 p-8">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Chi tiết sản phẩm</h3>
          <p className="text-gray-700 leading-relaxed">{product.details}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

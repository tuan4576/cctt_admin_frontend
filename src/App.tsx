import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ECommerce from './pages/Dashboard/ECommerce';
import Product from './pages/Dashboard/Product';
import ProductDetail from './pages/Dashboard/See/ProductDetail';
import Category from './pages/Dashboard/Category';
import Evaluate from './pages/Dashboard/Evaluate';
import EditProduct from './pages/Dashboard/Edit/EditProduct';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import DefaultLayout from './layout/DefaultLayout';
import CreateProduct from './pages/Dashboard/Create/CreateProduct';
import User from './pages/Dashboard/User';
import Checkout from './pages/Dashboard/Checkout';
import Test from './pages/Dashboard/test';
import EditCategories from './pages/Dashboard/Edit/EditCategories';
import CreateCategory from './pages/Dashboard/Create/CreateCategory';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasShownAuthToast, setHasShownAuthToast] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    // Check if user is authenticated (e.g., by checking for a token in localStorage)
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  //   if (!isAuthenticated && !hasShownAuthToast) {
  //     toast.error('Bạn cần đăng nhập để truy cập trang này!', {
  //       position: "bottom-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     setHasShownAuthToast(true);
  //     return <Navigate to="/auth/signin" replace />;
  //   }
  //   return <>{children}</>;
  // };

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/signin" replace />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
            // <ProtectedRoute>
              <DefaultLayout>
                <Routes>
                  <Route path="ecommerce" element={<ECommerce />} />
                  <Route path="product" element={<Product />} />
                  <Route path="productdetail/:id" element={<ProductDetail />} />
                  <Route path="category" element={<Category />} />
                  <Route path="evaluate" element={<Evaluate />} />
                  <Route path="createproduct" element={<CreateProduct />} />
                  <Route path="createcategory" element={<CreateCategory />} />
                  <Route path="editproduct/:id" element={<EditProduct />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="forms/form-elements" element={<FormElements />} />
                  <Route path="forms/form-layout" element={<FormLayout />} />
                  <Route path="tables" element={<Tables />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="chart" element={<Chart />} />
                  <Route path="user" element={<User />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="test" element={<Test/>} />
                  <Route path="editcategories/:id" element={<EditCategories/>} />
                </Routes>
              </DefaultLayout>
            // </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

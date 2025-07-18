import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ScrollToTop } from './lib/utils';
import SuccessPaymentPage from './pages/payments/SuccessPaymentPage';
import ErrorPaymentPage from './pages/payments/ErrorPaymentPage';
import { Toaster } from 'react-hot-toast';
import { SetDefaultLanguage } from './components/Language/SetDefaultLanguage';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import Orders from './pages/Orders';
import ForgotPasswordPage from './pages/auth/ForgotPassword';

function App() {
  const userData = useSelector((state: RootState) => state.user.userData?.data);

  const sessionToken = userData?.token || '';

  return (
    <>
      <div>
        <Toaster position='bottom-right' />
        <BrowserRouter>
          <ScrollToTop />
          <SetDefaultLanguage />
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/product/:id' element={<Product />} />

            {/* Private routes */}
            <Route
              path='/wishlist'
              element={sessionToken ? <Wishlist /> : <Navigate to='/login' />}
            />
            <Route
              path='/cart'
              element={sessionToken ? <Cart /> : <Navigate to='/login' />}
            />
            <Route
              path='/orders'
              element={sessionToken ? <Orders /> : <Navigate to='/login' />}
            />

            {/* Auth routes */}
            <Route
              path='/login'
              element={sessionToken ? <Navigate to='/' /> : <Login />}
            />
            <Route
              path='/register'
              element={sessionToken ? <Navigate to='/' /> : <Register />}
            />
            <Route
              path='/forgot-password'
              element={
                sessionToken ? <Navigate to='/' /> : <ForgotPasswordPage />
              }
            />

            {/* Payment Stripe */}
            <Route path='/success' element={<SuccessPaymentPage />} />
            <Route path='/cancel' element={<ErrorPaymentPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

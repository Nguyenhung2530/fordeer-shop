import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import CartPage from "@/pages/cart-page";
import CheckoutPage from "@/pages/checkout-page";
import OrderSuccessPage from "@/pages/checkout-page/order-success";
import VNPayReturnPage from "@/pages/checkout-page/vnpay-return";
import SePayReturnPage from "@/pages/checkout-page/sepay-return";
import HomePage from "@/pages/home-page";
import OrdersPage from "@/pages/orders-page";
import RecruitmentPage from "@/pages/recruitment-page";
import OrderPage from "@/pages/order-page";
import NewsPage from "@/pages/news-page";
import StoresPage from "@/pages/stores-page";
import AboutPage from "@/pages/about-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth-page";
import ForgotPasswordPage from "./pages/auth-page/forgot-password";
import ResetPasswordPage from "./pages/auth-page/reset-password";
import PrivacyPolicy from "./pages/privacy-policy";
import ProfilePage from "./pages/profile-page";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/payment/vnpay-return" element={<VNPayReturnPage />} />
        <Route path="/payment/sepay-return" element={<SePayReturnPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

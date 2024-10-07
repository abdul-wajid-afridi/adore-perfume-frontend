import { memo, useEffect, useState } from "react";
import {
  matchPath,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import { ProtectAdminRoutes } from "./lib/protect-routes";
import AdminDashboard from "./pages/dashboard/admin-dashboard";
import AdminContactPage from "./pages/dashboard/pages/contact";
import Products from "./pages/dashboard/pages/products";
import CommunityAndHelp from "./pages/dashboard/pages/community-help";
import Orders from "./pages/dashboard/pages/orders";
import AddProduct from "./pages/dashboard/pages/products/AddProduct";
import AdminSignInForm from "./pages/dashboard/pages/admin-login";
import EditProduct from "./pages/dashboard/pages/products/EditProduct";
import ProductDetails from "./pages/dashboard/pages/products/productDetails";
import CategoryPage from "./pages/dashboard/pages/category";
import WhatsAppButton from "./components/whatsapp-button";
import ProductDetailsPage from "./pages/product-details";
import CartPage from "./pages/cart";
import { useAppDispatch } from "./hooks/hook";
import { cartData } from "./redux/feature/cartSlice";
import CheckoutPage from "./pages/checkout";
import PaymentSuccess from "./pages/payments-success";
import ScentPage from "./pages/scent";
import ContactUs from "./pages/contact-us";
import AdminReviewsPage from "./pages/dashboard/pages/reviews";
import ReviewsPage from "./pages/reviews";
import AdminOrderDetails from "./pages/dashboard/pages/orders/orderDetails";
import Header from "./components/header";
import Search from "./pages/search";
import AdminTastePage from "./pages/dashboard/pages/taste";
import AdminBrandPage from "./pages/dashboard/pages/brand";
import AdminSettingsPage from "./pages/dashboard/pages/admin-settings";
import PageNotFound from "./pages/not-found";
import CustomizePage from "./pages/customize";
import FooterSection from "./pages/home/components/footer-section";
import CareersPage from "./pages/careers";
import BestSelling from "./pages/best-sellings";
import MainLoader from "./components/main-loader";
import AddGiftBox from "./pages/dashboard/pages/gift-box/AddGiftBox";
import EditGiftBox from "./pages/dashboard/pages/gift-box/EditGiftBox";
import AdminGiftBoxDetails from "./pages/dashboard/pages/gift-box/GiftBoxDetails";
import AdminGiftBoxPage from "./pages/dashboard/pages/gift-box";
import GiftBoxPage from "./pages/gift-box";
import GiftBoxDetailPage from "./pages/gift-box/gift-box-details";
import { giftBoxCartData } from "./redux/feature/giftBoxCartSlice";
import GiftBoxCheckoutPage from "./pages/gift-box-checkout";
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyPolicy from "./pages/privacy-policy";

const App = memo(function App() {
  const dispatch = useAppDispatch();

  useEffect(
    function fetchCartDataOnMount() {
      dispatch(cartData());
      dispatch(giftBoxCartData());
    },
    [dispatch]
  );

  const [loading, setLoading] = useState(true);

  useEffect(function showLogoOnMount() {
    const loadData = async () => {
      // give a delaye so that we can show the logo
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <MainLoader />;
  }
  return (
    <div>
      <Router>
        <Header />
        <NavbarDisplay />
        <WhatsAppButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/online-store" element={<p>online store</p>} />
          <Route path="/scent" element={<ScentPage />} />
          <Route path="/customize" element={<CustomizePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/gift-box" element={<GiftBoxPage />} />
          <Route path="/gift-box-checkout" element={<GiftBoxCheckoutPage />} />
          <Route
            path="/gift-box-details/:giftBoxId"
            element={<GiftBoxDetailPage />}
          />
          {/* <Route path="/login" element={<SignInForm />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin-login" element={<AdminSignInForm />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/search" element={<Search />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetailsPage />}
          />
          {/* Admin dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectAdminRoutes>
                <AdminDashboard />
              </ProtectAdminRoutes>
            }
          >
            <Route path="contact-us" element={<AdminContactPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="orders" element={<Orders />} />
            <Route
              path="order-details/:orderId"
              element={<AdminOrderDetails />}
            />

            <Route path="community" element={<CommunityAndHelp />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path={"edit-product/:productId"} element={<EditProduct />} />
            <Route
              path={"product-details/:productId"}
              element={<ProductDetails />}
            />

            <Route path="gift-box" element={<AdminGiftBoxPage />} />
            <Route path="add-gift-box" element={<AddGiftBox />} />
            <Route path="edit-gift-box/:giftBoxId" element={<EditGiftBox />} />
            <Route
              path="gift-box-details/:giftBoxId/:giftBoxId"
              element={<AdminGiftBoxDetails />}
            />

            <Route path="brand" element={<AdminBrandPage />} />
            <Route path="taste" element={<AdminTastePage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <FooterDisplay />
      </Router>
    </div>
  );
});

// NavbarDisplay/> is to show navbar on specific routes
const NavbarDisplay = memo(function NavbarDisplay() {
  const { pathname } = useLocation();

  const pathsToShowNavbar = [
    "/",
    "/online-store",
    "/customize",
    "/about",
    "/login",
    "/scent",
    "/cart",
    "/product-details/:productId",
    "/checkout",
    "/payment-success",
    "/contact-us",
    "/reviews",
    "/search",
    "/careers",
    "/best-selling",
    "/gift-box",
    "/gift-box-details/:giftBoxId",
    "/gift-box-checkout",
    "/terms-and-conditions",
    "/privacy-policy",
  ];

  const shouldShowNavbar = pathsToShowNavbar.some((path) =>
    matchPath(path, pathname)
  );

  return shouldShowNavbar ? <Navbar /> : null;
});

// FooterDisplay/> is to show navbar on specific routes
const FooterDisplay = memo(function FooterDisplay() {
  const { pathname } = useLocation();

  const pathsToShowFooter = [
    "/",
    "/online-store",
    "/customize",
    "/about",
    "/login",
    "/scent",
    "/cart",
    "/checkout",
    "/product-details/:productId",
    "/payment-success/:amount",
    "/contact-us",
    "/reviews",
    "/search",
    "/careers",
    "/best-selling",
    "/terms-and-conditions",
    "/privacy-policy",
  ];

  const shouldShowFooter = pathsToShowFooter.some((path) =>
    matchPath(path, pathname)
  );

  return shouldShowFooter ? (
    <div>
      <FooterSection />
      <Footer />
    </div>
  ) : null;
});
export default App;

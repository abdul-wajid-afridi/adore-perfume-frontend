import { memo, useEffect } from "react";
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
import SignInForm from "./pages/sign-in";
import { ProtectAdminRoutes } from "./lib/protect-routes";
import AdminDashboard from "./pages/dashboard/admin-dashboard";
import ContactPage from "./pages/dashboard/pages/contact";
import Products from "./pages/dashboard/pages/products";
import CommunityAndHelp from "./pages/dashboard/pages/community-help";
import Orders from "./pages/dashboard/pages/orders";
import Settings from "./pages/dashboard/pages/settings";
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

const App = memo(function App() {
  const dispatch = useAppDispatch();

  useEffect(
    function fetchCartDataOnMount() {
      dispatch(cartData());
    },
    [dispatch, cartData]
  );
  return (
    <div>
      <Router>
        <NavbarDisplay />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/online-store" element={<p>online store</p>} />
          <Route path="/scent" element={<ScentPage />} />
          <Route path="/customize" element={<p>customize</p>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin-login" element={<AdminSignInForm />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-success/:amount" element={<PaymentSuccess />} />
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
            <Route path="contact" element={<ContactPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="community" element={<CommunityAndHelp />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path={"edit-product/:productId"} element={<EditProduct />} />
            <Route
              path={"product-details/:productId"}
              element={<ProductDetails />}
            />
          </Route>

          <Route path="*" element={<p>page not found</p>} />
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
  ];

  const shouldShowFooter = pathsToShowFooter.some((path) =>
    matchPath(path, pathname)
  );

  return shouldShowFooter ? <Footer /> : null;
});
export default App;

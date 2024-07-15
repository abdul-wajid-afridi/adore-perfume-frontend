import { memo } from "react";
import {
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

const App = memo(function App() {
  return (
    <div>
      <Router>
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/online-store" element={<p>online store</p>} />
          <Route path="/cent" element={<p>cent</p>} />
          <Route path="/customize" element={<p>customize</p>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/cart" element={<p>this is cart page</p>} />
          <Route path="/admin-login" element={<AdminSignInForm />} />
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
            <Route path="orders" element={<Orders />} />
            <Route path="community" element={<CommunityAndHelp />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path={`edit-product/:productId`} element={<EditProduct />} />
            <Route
              path={`product-details/:productId`}
              element={<ProductDetails />}
            />
          </Route>

          <Route path="*" element={<p>page not found</p>} />
        </Routes>

        <FooterWrapper />
      </Router>
    </div>
  );
});

// NavbarWrapper/> is to show navbar on specific routes
const NavbarWrapper = memo(function NavbarWrapper() {
  const { pathname } = useLocation();
  if (pathname == "/") {
    return <Navbar />;
  }
  if (pathname == "/online-store") {
    return <Navbar />;
  }
  if (pathname == "/customize") {
    return <Navbar />;
  }
  if (pathname == "/about") {
    return <Navbar />;
  }
  if (pathname == "/login") {
    return <Navbar />;
  }
  if (pathname == "/cart") {
    return <Navbar />;
  }
});

// FooterWrapper/> is to show navbar on specific routes
const FooterWrapper = memo(function FooterWrapper() {
  const { pathname } = useLocation();
  if (pathname == "/") {
    return <Footer />;
  }
  if (pathname == "/online-store") {
    return <Footer />;
  }
  if (pathname == "/customize") {
    return <Footer />;
  }
  if (pathname == "/about") {
    return <Footer />;
  }
  if (pathname == "/login") {
    return <Footer />;
  }
  if (pathname == "/cart") {
    return <Footer />;
  }
});

export default App;

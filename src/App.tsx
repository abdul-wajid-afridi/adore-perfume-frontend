import { memo } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import SignInForm from "./pages/sign-in";

const App = memo(function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/online-store" element={<p>online store</p>} />
          <Route path="/cent" element={<p>cent</p>} />
          <Route path="/customize" element={<p>customize</p>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="*" element={<p>page not found</p>} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
});

export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// components
import Header from "./view/components/navbar/Header";
import Footer from "./view/components/navbar/Footer";

// pages
import Home from "./view/pages/Home";
import TourDetails from "./view/pages/tour-details";
import Login from "./view/pages/auth/Login";
import Signup from "./view/pages/auth/Signup";
import NotFound from "./view/pages/NotFound";

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;

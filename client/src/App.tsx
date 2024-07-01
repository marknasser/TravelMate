import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// Layouts
import AuthLayout from "./view/layouts/AuthLayout";

// components
import Header from "./view/components/navbar/Header";
import Footer from "./view/components/navbar/Footer";

// pages
import Home from "./view/pages/Home";
import TourDetails from "./view/pages/tour-details";
import Login from "./view/pages/auth/Login";
import Signup from "./view/pages/auth/Signup";
import Dashboard from "./view/pages/dashboard";
import NotFound from "./view/pages/NotFound";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { checkIsLoggedIn } from "./store/auth/operations";

import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<TourDetails />} />0
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard/*"
            element={
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            }
          />
          <Route path="*" element={<NotFound onClick={() => {}} />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;

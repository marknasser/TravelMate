import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// components
import Navbar from "./view/components/navbar";

// pages
import Home from "./view/pages/Home";
import TourDetails from "./view/pages/tour-details";
import Login from "./view/pages/auth/Login";
import Signup from "./view/pages/auth/Signup";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        {/* <div className="flex  justify-center items-center py-20"></div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"; // ✅ Footer import
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Tools from "./pages/Tools/Tools";
import Friends from "./pages/Friends/Friends";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ✅ Footer sab pages ke neeche */}
      <Footer />
    </Router>
  );
}

export default App;

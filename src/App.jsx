import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import LandingPage from "./components/pages/Landing";
import Dashboard from "./components/pages/Dashboard";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login"; 
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";
import Help from "./components/Sidebar/Help";
import Settings from "./components/Sidebar/Settings";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Retrieve initial state from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<LandingPage onLogin={handleLogin} />} />

          {/* Login route */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Signup route */}
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
            path="/students"
            element={isLoggedIn ? <StudentList /> : <Navigate to="/" />}
          />
          <Route
            path="/add-student"
            element={isLoggedIn ? <StudentForm /> : <Navigate to="/" />}
          />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/students" element={<StudentList/>} />

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

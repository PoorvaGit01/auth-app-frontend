import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import { Button, Box, Typography } from '@mui/material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Landing page with Login and Signup buttons */}
        <Route
          path="/"
          element={
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <Typography variant="h4" gutterBottom>
                Welcome to Our Platform
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => window.location.href = "/login"}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => window.location.href = "/signup"}
              >
                Sign Up
              </Button>
            </Box>
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />}
        />

        {/* Signup route */}
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Signup />}
        />

        {/* Home route */}
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;

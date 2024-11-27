import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import { useSearchParams } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [referralToken, setReferralToken] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();  // Initialize the useNavigate hook

  useEffect(() => {
    const token = searchParams.get('referral_token');
    if (token) {
      setReferralToken(token); // Store the referral token
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const payload = { ...formData, referral_token: referralToken }; // Include the referral token
      const response = await axios.post('http://localhost:3000/api/v1/signup', payload);
      setSuccess('Registration successful! Please log in.');
      
      // After success, navigate to the home page
      setTimeout(() => {
        navigate('/login');  
      }, 2000);  
    } catch (err) {
      setError(err.response?.data?.errors || 'Registration failed.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={formData.password_confirmation}
          onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default Signup;

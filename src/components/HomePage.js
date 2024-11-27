import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const HomePage = ({ onLogout }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendReferral = async () => {
    setMessage('');
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/referrals/send',
        { email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
      );
      setMessage(response.data.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.errors || 'Failed to send referral email.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Invite Friends
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={onLogout}
        sx={{ mb: 3 }}
      >
        Logout
      </Button>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        label="Friend's Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSendReferral}
        disabled={!email}
      >
        Send Invite
      </Button>
    </Box>
  );
};

export default HomePage;

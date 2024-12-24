import React, { useState } from 'react';
import { supabase } from '../../createClient'; 
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setSnackbarOpen(true);
    } else {
      onLogin(); 
      navigate('/dashboard'); // Redirect to dashboard on successful login
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ffe6e6',
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          maxWidth: 400,
          width: '100%', // Make it responsive
          bgcolor: '#ffffff',
          padding: 4,
          borderRadius: 3,
          boxShadow: 5,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#6a11cb' }}
        >
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={{
            '& .MuiInputBase-root': {
              bgcolor: '#f9f9f9',
              borderRadius: 2,
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={{
            '& .MuiInputBase-root': {
              bgcolor: '#f9f9f9',
              borderRadius: 2,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            padding: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: 2,
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            '&:hover': {
              background: 'linear-gradient(to right, #5b0eaa, #1e5bd1)',
            },
          }}
        >
          Login
        </Button>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
    
  );
};

export default Login;

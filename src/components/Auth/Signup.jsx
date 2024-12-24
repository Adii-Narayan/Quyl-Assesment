import React, { useState } from "react";
import { supabase } from "../../createClient"; // Ensure this is your Supabase client
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Sign up the user with email and password
    const { user, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
      setSnackbarOpen(true);
      return;
    }

    if (user) {
      // Insert the username into the users_profile table
      const { error: profileError } = await supabase
        .from("users_profile")
        .insert([{ id: user.id, username }]); // Assuming your table has 'id' and 'username' columns

      if (profileError) {
        setError(profileError.message);
        setSnackbarOpen(true);
      } else {
        // Show success message and redirect to dashboard
        navigate("/dashboard");
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          bgcolor: "#ffffff",
          color: "#333333",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{
              color: "#1976d2",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Signup
          </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Signup
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;

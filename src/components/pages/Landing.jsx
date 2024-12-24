import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Grid } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        bgcolor: "#f9f9f9", // Light neutral background
        textAlign: "center",
        padding: 3,
      }}
    >
      <Box
        component="img"
        src="/logo.jpeg" // Display the logo
        alt="Logo"
        sx={{
          width: 150, // Adjust logo size
          height: "auto",
          mb: 3, // Margin bottom
          borderRadius: "50%", // Make the logo circular
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      />
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#005b96",
          fontStyle: "normal",
          fontFamily: "'Poppins', sans-serif",
          mb: 3, // Margin bottom
        }}
      >
        Welcome to QUYL
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#444",
          maxWidth: 600,
          lineHeight: 1.6,
          marginBottom: 4,
          fontFamily: "'Roboto', sans-serif",
          fontSize: "1rem",
        }}
      >
        QUYL is an innovative educational technology company that empowers educators with a comprehensive suite of tools to streamline student management. Our platform provides a centralized hub for teachers and administrators to track student progress, manage attendance, communicate with parents, assign and grade assignments, and personalize learning experiences. QUYL's intuitive interface and user-friendly features enhance efficiency, improve communication, and foster a more engaging and supportive learning environment for students and educators alike.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#666",
          marginBottom: 4,
          fontSize: "1.1rem",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Please log in or sign up to continue.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "12px 24px",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "#0077c2", // Calm blue shade
                borderRadius: "30px", // Rounded buttons
                fontSize: "1rem",
                fontFamily: "'Poppins', sans-serif",
                '&:hover': {
                  backgroundColor: "#005b96", // Darker blue shade on hover
                },
              }}
            >
              Login
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                padding: "12px 24px",
                fontWeight: "bold",
                textTransform: "none",
                borderColor: "#0077c2", // Calm blue border
                color: "#0077c2",
                borderRadius: "30px", // Rounded buttons
                fontSize: "1rem",
                fontFamily: "'Poppins', sans-serif",
                '&:hover': {
                  backgroundColor: "#f0f8ff", // Light blue background on hover
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;

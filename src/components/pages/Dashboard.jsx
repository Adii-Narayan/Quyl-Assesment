import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../createClient";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  styled,
  alpha,
  Badge,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Sidebar from "../Sidebar/Sidebar";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data, error } = await supabase.from("students").select("*");
        if (error) throw error;
        setStudents(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const loggedInUser = {
    name: "User logged in",
    avatar: "/avatar-placeholder.png",
  };

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCohortChange = (event) => {
    setSelectedCohort(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  if (loading) {
    return <Typography align="center">Loading students...</Typography>;
  }

  if (error) {
    return <Typography align="center" color="error">Error: {error}</Typography>;
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCohort = selectedCohort ? student.cohort === selectedCohort : true;
    const matchesCourse = selectedCourse
      ? Array.isArray(student.courses)
        ? student.courses.includes(selectedCourse)
        : student.courses === selectedCourse
      : true;
    return matchesSearch && matchesCohort && matchesCourse;
  });

  const uniqueCohorts = [...new Set(students.map((student) => student.cohort))];
  const uniqueCourses = [...new Set(students.flatMap((student) => student.courses || []))];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", backgroundColor: "#fafafa", marginLeft: 2 }}>
          <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: "#333", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* Logo Area */}
              <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", color: "white", display: 'flex', alignItems: 'center' }}>
                <img src="/logo.jpeg" alt="Logo" style={{ height: '70px', marginLeft: '10px' }} />
              </Typography>
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Search>
                  <InputBase
                    placeholder="Search your course..."
                    inputProps={{ "aria-label": "search" }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                      width: "100%",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 16,
                      padding: "8px",
                      color: "white",
                      backgroundColor: alpha("#ffffff", 0.2),
                      borderRadius: 1,
                    }}
                  />
                </Search>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton size="large" color="inherit">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Avatar src={loggedInUser.avatar} alt={loggedInUser.name} sx={{ ml: 2 }} />
                <Typography sx={{ ml: 1, fontFamily: "'Poppins', sans-serif", color: "white" }}>
                  {loggedInUser.name}
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}>
                Students
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddStudent}
                sx={{ textTransform: "capitalize", fontFamily: "'Poppins', sans-serif" }}
              >
                + Add New Student
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Cohort</InputLabel>
                <Select
                  value={selectedCohort}
                  onChange={handleCohortChange}
                  label="Cohort"
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <MenuItem value="">All Cohorts</MenuItem>
                  {uniqueCohorts.map((cohort) => (
                    <MenuItem key={cohort} value={cohort}>
                      {cohort}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  label="Course"
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <MenuItem value="">All Courses</MenuItem>
                  {uniqueCourses.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}>Student Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}>Cohort</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}>Courses</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}>Date Joined</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}>Last Login</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>{student.name}</TableCell>
                      <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>{student.cohort}</TableCell>
                      <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                        {Array.isArray(student.courses) ? student.courses.join(", ") : student.courses || "N/A"}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>{new Date(student.date_joined).toLocaleDateString()}</TableCell>
                      <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>{new Date(student.last_login).toLocaleString()}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            height: 12,
                            width: 12,
                            borderRadius: "50%",
                            backgroundColor: student.status ? "green" : "red",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;

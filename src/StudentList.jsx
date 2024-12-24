import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const StudentList = () => {
  const dispatch = useDispatch();
  const { data: students, status, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Typography align="center">Loading students...</Typography>;
  }

  if (status === "failed") {
    return <Typography align="center" color="error">Error: {error || "Failed to fetch students."}</Typography>;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "Arial, sans-serif", fontSize: "1.8rem" }}>
          Students
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Select defaultValue="AY 2024-25" variant="outlined" sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}>
              <MenuItem value="AY 2024-25">AY 2024-25</MenuItem>
              <MenuItem value="AY 2023-24">AY 2023-24</MenuItem>
            </Select>
            <Select defaultValue="CBSE 9" variant="outlined" sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}>
              <MenuItem value="CBSE 9">CBSE 9</MenuItem>
              <MenuItem value="CBSE 10">CBSE 10</MenuItem>
            </Select>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}
          >
            Add New Student
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", fontWeight: "bold" }}>Student Name</TableCell>
                <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", fontWeight: "bold" }}>Cohort</TableCell>
                <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", fontWeight: "bold" }}>Courses</TableCell>
                <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", fontWeight: "bold" }}>Date Joined</TableCell>
                <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", fontWeight: "bold" }}>Last Login</TableCell>
                <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem", fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}>{student.name}</TableCell>
                  <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}>{student.cohort}</TableCell>
                  <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Avatar src="/static/images/course-icon.png" sx={{ width: 24, height: 24 }} />
                      {student.courses || "No Courses"}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}>{new Date(student.date_joined).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ fontFamily: "Arial, sans-serif", fontSize: "1rem" }}>{new Date(student.last_login).toLocaleString()}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 12,
                        width: 12,
                        borderRadius: "100%",
                        backgroundColor: student.status ? "green" : "red",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "1rem",
                        color: "white",
                        fontWeight: "bold",
                        padding: 2,
                        cursor: "pointer",
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
  );
};

export default StudentList;

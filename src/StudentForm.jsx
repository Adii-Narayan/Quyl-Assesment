import React, { useState } from "react";
import { supabase } from "./createClient";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    courses: "",
    date_joined: "",
    last_login: "",
    status: true,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Post the data to the database
    const { data, error } = await supabase.from("students").insert([formData]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Student added successfully!");
      setFormData({
        name: "",
        cohort: "",
        courses: "",
        date_joined: "",
        last_login: "",
        status: true,
      });
      setTimeout(() => navigate("/dashboard"), 1500); // Redirect after a short delay
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f9fc", // Light background
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px", // Increased height and width
          background: "#fff", // White background for the form
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
          Add a New Student
        </h2>
        {message && (
          <p
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: message.startsWith("Error") ? "#ff0000" : "#4caf50",
            }}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#000" }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student's name"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: "#f3f3f3",
                color: "#000",
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#000" }}>Cohort</label>
            <input
              type="text"
              name="cohort"
              value={formData.cohort}
              onChange={handleChange}
              placeholder="Enter cohort details"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: "#f3f3f3",
                color: "#000",
              }}
              required
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#000" }}>Courses</label>
            <input
              type="text"
              name="courses"
              value={formData.courses}
              onChange={handleChange}
              placeholder="Enter courses"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: "#f3f3f3",
                color: "#000",
              }}
              required
            />
          </div>
          <div>
  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#000" }}>Date Joined</label>
  <input
    type="date"
    name="date_joined"
    value={formData.date_joined}
    onChange={handleChange}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      backgroundColor: "#f3f3f3",
      color: "#000",
    }}
    required
  />
</div>
<div>
  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#000" }}>Last Login</label>
  <input
    type="datetime-local"
    name="last_login"
    value={formData.last_login}
    onChange={handleChange}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      backgroundColor: "#f3f3f3",
      color: "#000",
    }}
    required
  />
</div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#000" }}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                backgroundColor: "#f3f3f3",
                color: "#000",
              }}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;

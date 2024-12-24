// studentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "./createClient";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const { data, error } = await supabase
      .from('students') // Replace with your table name
      .select('*'); // Select all columns

    if (error) throw new Error(error.message);
    return data; // Return the fetched data
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentsSlice.reducer;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./studentsSlice"; // Adjust path as necessary

const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

export default store;

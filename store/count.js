import { createSlice } from "@reduxjs/toolkit";

export const countSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    incrementByOne: (state) => {
      state.count += 1;
    },
    decrementByOne: (state) => {
      state.count -= 1;
    },
    incrementByInput: (state, action) => {
      state.count += action.payload.input;
    },
    decrementByInput: (state, action) => {
      state.count -= action.payload.input;
    },
  },
});

export const {
  incrementByOne,
  decrementByOne,
  incrementByInput,
  decrementByInput,
} = countSlice.actions;
export default countSlice.reducer;

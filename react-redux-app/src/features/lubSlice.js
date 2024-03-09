import { createSlice } from "@reduxjs/toolkit";

export const lubSlice = createSlice({
  name: "lub",
  initialState: {
    lubEntries: [],
  },

  reducers: {
    setLub: (state, action) => {
      // Check if the entry already exists based on timestamp
      const existingEntryIndex = state.lubEntries.findIndex(
        (entry) => entry.time === action.payload.time
      );

      if (existingEntryIndex === -1) {
        // If the entry doesn't exist, add it to the array
        state.lubEntries.push(action.payload);
      } else {
        // If the entry exists, replace it with the new one
        state.lubEntries[existingEntryIndex] = action.payload;
      }
    },
  },
});

export const { setLub } = lubSlice.actions;

export const selectLubEntries = (state) => state.lub.lubEntries;

export default lubSlice.reducer;

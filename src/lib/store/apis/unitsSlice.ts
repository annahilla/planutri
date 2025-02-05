import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UnitsState {
  units: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UnitsState = {
  units: [],
  status: "idle",
  error: null,
};

export const fetchUnits = createAsyncThunk("/api/units", async () => {
  const response = await fetch("/api/units");
  const data = await response.json();
  return data[0].units;
});

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.units = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch units";
      });
  },
});

const unitsReducer = unitsSlice.reducer
export default unitsReducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface State {
  dates: string[];
  selectedDate: string[];
}

const initialState: State = {
  dates: [],
  selectedDate: [],
};

export const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setDates: (state, action: PayloadAction<string[]>) => {
      state.dates = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string[]>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDates, setSelectedDate } = datesSlice.actions;

export default datesSlice.reducer;

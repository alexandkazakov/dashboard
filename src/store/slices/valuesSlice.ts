import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  BusinessResponse,
  InfrastructureResponse,
  MonitoringResponse,
  PoliceResponse,
  EngineeringResponseItem,
  ValuesApiResponse,
} from "../../types/api";
import { TabName } from "../../types/types";

export type ValuesType = {
  infrastructure: InfrastructureResponse | null;
  business: BusinessResponse | null;
  police: PoliceResponse | null;
  monitoring: MonitoringResponse | null;
  engineering: EngineeringResponseItem[] | null;
};

interface State {
  values: ValuesType;
}

const initialState: State = {
  values: {
    infrastructure: null,
    business: null,
    police: null,
    monitoring: null,
    engineering: null,
  },
};

export const valuesSlice = createSlice({
  name: "values",
  initialState,
  reducers: {
    setValues: (
      state,
      action: PayloadAction<{
        data: ValuesApiResponse;
        tab: Exclude<TabName, "error" | "upload">;
      }>,
    ) => {
      const { data, tab } = action.payload;

      state.values[tab] = data;
    },
  },
});

export const { setValues } = valuesSlice.actions;

export default valuesSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

import { datesApi } from "./services/datesApi";
import { valuesApi } from "./services/valuesApi";
import datesReducer from "./slices/datesSlice";
import valuesReducer from "./slices/valuesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    dates: datesReducer,
    [datesApi.reducerPath]: datesApi.reducer,
    values: valuesReducer,
    [valuesApi.reducerPath]: valuesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([datesApi.middleware, valuesApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

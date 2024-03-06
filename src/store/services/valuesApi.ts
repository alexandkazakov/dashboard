import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setValues } from "../slices/valuesSlice";
import { TabName } from "../../types/types";
import { ValuesApiResponse } from "../../types/api";

export const valuesApi = createApi({
  reducerPath: "valuesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
  endpoints: (builder) => ({
    getValues: builder.query<
      ValuesApiResponse,
      { tab: Exclude<TabName, "error" | "upload">; date: string }
    >({
      query: ({ tab, date }) => `${tab}?date=${date}`,
      async onQueryStarted({ tab }, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const data = result.data;
        dispatch(setValues({ data, tab }));
      },
    }),
  }),
});

export const { useGetValuesQuery } = valuesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DatesApiResponse } from "../../types/api";
import { setDates, setSelectedDate } from "../slices/datesSlice";

export const datesApi = createApi({
  reducerPath: "datesApi",
  tagTypes: ["Dates"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getDates: builder.query<DatesApiResponse, string[] | null>({
      query: () => "dates",
      providesTags: ["Dates"],
      async onQueryStarted(initialDateValue, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        const data = result.data;

        const initialValue = initialDateValue ? initialDateValue : [data[0]];

        dispatch(setDates(data));
        dispatch(setSelectedDate(initialValue));
      },
    }),
    uploadFile: builder.mutation<
      string,
      { formData: FormData; method?: string }
    >({
      query: ({ formData, method = "POST" }) => {
        return {
          url: "file",
          method,
          headers: {
            Accept: "application/json",
          },
          body: formData,
        };
      },
      invalidatesTags: ["Dates"],
    }),
  }),
});

export const { useGetDatesQuery, useUploadFileMutation } = datesApi;

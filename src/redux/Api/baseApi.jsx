import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://api.kidsknowrights.com",
  baseUrl: "https://api.kidsknowrights.com",
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});

// export const imageUrl = "https://api.kidsknowrights.com";
export const imageUrl = "https://api.kidsknowrights.com";

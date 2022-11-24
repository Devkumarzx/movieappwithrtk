import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { REACT_APP_BASEURL, REACT_APP_APIKEY } = process.env;

export const MovieApi = createApi({
  reducerPath: "MovieApi",
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASEURL }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ surl, cname, query, page }) =>
        `${surl}/movie${cname}?api_key=${REACT_APP_APIKEY}&language=en-US&query=${query}&page=${page}`,
    }),

    getMovieDetail: builder.query({
      query: (id) => `movie/${id}?api_key=${REACT_APP_APIKEY}&language=en-US`,
    }),

    getCast: builder.query({
      query: (id) =>
        `movie/${id}/credits?api_key=${REACT_APP_APIKEY}&language=en-US`,
    }),
  }),
});

export const {
  useLazyGetMoviesQuery,
  useGetMovieDetailQuery,
  useGetCastQuery,
} = MovieApi;

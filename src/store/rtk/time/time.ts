import { api } from "../emptyApi";

export const timeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentTime: build.query({
      query: () => {
        return {
          url: `https://worldtimeapi.org/api/ip`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCurrentTimeQuery } = timeApi;

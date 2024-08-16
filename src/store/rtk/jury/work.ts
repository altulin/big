import { token } from "@/service/token";
import { api } from "../emptyApi";

export const getWork = api.injectEndpoints({
  endpoints: (build) => ({
    getWorkJury: build.query({
      query: ({ id }) => {
        return {
          url: `/api/jury/works/${id}`,
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        };
      },
    }),
  }),
  //   overrideExisting: false,
});

export const { useLazyGetWorkJuryQuery } = getWork;

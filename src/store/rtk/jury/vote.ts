import { token } from "@/service/token";
import { api } from "../emptyApi";

export const voteWork = api.injectEndpoints({
  endpoints: (build) => ({
    voteWork: build.mutation({
      query: ({ id_work, body }) => {
        return {
          url: `/api/jury/works/${id_work}/vote`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token()}`,
          },
          body,
        };
      },
    }),
  }),
});

export const { useVoteWorkMutation } = voteWork;

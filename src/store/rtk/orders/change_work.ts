import { token } from "@/service/token";
import { api } from "../emptyApi";

export const changeWork = api.injectEndpoints({
  endpoints: (build) => ({
    changeWork: build.mutation({
      query: ({ id_work, body }) => {
        console.log(id_work);
        return {
          url: `/api/orders/works/${id_work}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token()}`,
          },
          body,
        };
      },
    }),
  }),
  //   overrideExisting: false,
});

export const { useChangeWorkMutation } = changeWork;

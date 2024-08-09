import { token } from "@/service/token";
import { api } from "../emptyApi";

export const ticketsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTickets: build.query({
      query: ({ limit, offset }) => {
        return {
          url: `/api/orders/tickets?limit=10&offset=${offset}&limit=${limit}`,
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetTicketsQuery } = ticketsApi;

import { token } from "@/service/token";
import { api } from "../emptyApi";

export const priceApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPrice: build.query({
      query: ({ category, tickets_amount, works_amount }) => {
        return {
          url: `/api/orders/price?category=${category}&tickets_amount=${tickets_amount}&works_amount=${works_amount}`,
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetPriceQuery } = priceApi;

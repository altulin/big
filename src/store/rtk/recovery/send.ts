import { api } from "../emptyApi";

export const sendLink = api.injectEndpoints({
  endpoints: (build) => ({
    sendLink: build.mutation({
      query: (body) => ({
        url: "/api/users/recovery/send-link",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendLinkMutation } = sendLink;

// import { token } from "@/service/token";
import { api } from "../emptyApi";

export const recoveryPassword = api.injectEndpoints({
  endpoints: (build) => ({
    recoveryPassword: build.mutation({
      query: (body) => ({
        url: "/api/users/recovery-password",
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${token()}`,
        // },
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRecoveryPasswordMutation } = recoveryPassword;

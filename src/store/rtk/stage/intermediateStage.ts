import { api } from "../emptyApi";

export const intermediateStage = api.injectEndpoints({
  endpoints: (build) => ({
    intermediateStage: build.query({
      query: () => ({
        url: "/api/stages/intermediate-stage",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useIntermediateStageQuery } = intermediateStage;

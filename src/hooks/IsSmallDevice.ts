import { useMediaQuery } from "@uidotdev/usehooks";

export const useIsTabletDevice = () => {
  return useMediaQuery("only screen and (max-width : 768px)");
};

export const useIsMobileDevice = () => {
  return useMediaQuery("only screen and (max-width : 600px)");
};

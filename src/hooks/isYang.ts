import { paths } from "@/service/paths";
import { useLocation } from "react-router-dom";

const useIsYang = () => {
  const location = useLocation();

  const isYang = location.pathname === `/${paths.young_talent}`;
  return { isYang };
};

export default useIsYang;

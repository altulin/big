/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, Navigate } from "react-router-dom";
import useIsAuth from "../hooks/isAuth";
import { FC } from "react";
import { paths } from "@/service/paths";

const RequireAuth: FC<{ children: any }> = ({ children }) => {
  const location = useLocation();
  const isAuth = useIsAuth();

  if (!isAuth) {
    if (location.pathname === `/${paths.ticket}`) {
      return (
        <Navigate to={`/${paths.registration}`} state={{ from: location }} />
      );
    }
    // или открыть модалку авторизации
    return <Navigate to={"/"} state={{ from: location }} />;
  }

  return children;
};
export default RequireAuth;

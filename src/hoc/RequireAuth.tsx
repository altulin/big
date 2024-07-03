/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, Navigate } from "react-router-dom";
import useIsAuth from "../hooks/isAuth";
import { FC } from "react";

const RequireAuth: FC<{ children: any }> = ({ children }) => {
  const location = useLocation();
  const isAuth = useIsAuth();

  if (!isAuth) {
    // или открыть модалку авторизации
    return <Navigate to={"/"} state={{ from: location }} />;
  }

  return children;
};
export default RequireAuth;

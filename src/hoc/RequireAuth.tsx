import { useLocation, Navigate } from "react-router-dom";
import useIsAuth from "../hooks/isAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuth = useIsAuth();

  if (!isAuth) {
    // или открыть модалку авторизации
    return <Navigate to={"/"} state={{ from: location }} />;
  }

  return children;
};
export default RequireAuth;

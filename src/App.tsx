import { FC, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Template from "./templates_pages/Template";
import RequireAuth from "./hoc/RequireAuth";
import ModalManager from "./components/modal/ModalManager";
import Seo from "./hoc/Seo";
// import Cursor from "./hoc/AnimatedCursor";
import { HelmetProvider } from "react-helmet-async";

import { paths } from "./service/paths";
import HomePage from "./pages/home/HomePage";
import ServicePage from "./pages/service/ServicePage";
import Registration from "@/components/registration/Registration";
import Profile from "./components/profile/Profile";
import Pass from "./components/Pass/Pass";
import YoungTalentPage from "./pages/young_talent/YoungTalentPage";
import useIsYang from "./hooks/isYang";
import useIsAuth from "./hooks/isAuth";
import { useAppDispatch } from "./hooks/hook";
import { setUserData } from "./store/user/userSlice";
import { token } from "./service/token";
import { useGetMeMutation } from "./store/rtk/user/me";
import useSignOut from "./hooks/signOut";

const App: FC = () => {
  const title = import.meta.env.VITE_APP_TITLE;
  const description = import.meta.env.VITE_APP_DESCRIPTION;
  const url = import.meta.env.VITE_APP_URL;
  const { isYang } = useIsYang();
  const isAuth = useIsAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getMe, meData] = useGetMeMutation();
  const { handleSignOut } = useSignOut();

  // dark theme
  useEffect(() => {
    if (isYang) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isYang]);

  // reload private page
  useEffect(() => {
    if (!isAuth) return;
    if (!location.state) return;

    if (location.state.from.pathname === paths.private) {
      navigate(paths.private);
    }
  }, [isAuth, location.pathname, location.state, navigate]);

  // check valid token
  useEffect(() => {
    // if (isAuth) return;
    const myToken = token();
    if (myToken) {
      getMe(undefined).unwrap();
    }
  }, [dispatch, getMe]);

  // handle valid token
  useEffect(() => {
    if (meData.status === "rejected") {
      handleSignOut();
    }

    if (meData.status === "fulfilled") {
      dispatch(setUserData(meData.data));
    }
  }, [dispatch, handleSignOut, meData]);

  return (
    <HelmetProvider>
      {import.meta.env.PROD && (
        <Seo title={title} description={description} url={url} />
      )}
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<HomePage />} />
          <Route
            path={paths.registration}
            element={
              <ServicePage children={<Registration />} title="Регистрация" />
            }
          />

          <Route
            path={paths.profile}
            element={
              <RequireAuth>
                {<ServicePage children={<Profile />} title="Профиль" />}
              </RequireAuth>
            }
          />

          <Route
            path={paths.pass}
            element={
              <RequireAuth>
                {<ServicePage children={<Pass />} title="Подача работы" />}
              </RequireAuth>
            }
          />

          {/* <Route path="*" element={<HomePage />} /> */}
        </Route>
        <Route path={paths.young_talent} element={<Template />}>
          <Route index element={<YoungTalentPage />} />
        </Route>
      </Routes>
      <ModalManager />
      {/* <Cursor /> */}
    </HelmetProvider>
  );
};

export default App;

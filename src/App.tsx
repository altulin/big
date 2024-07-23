import { FC, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Template from "./templates_pages/Template";
import RequireAuth from "./hoc/RequireAuth";
import ModalManager from "./components/modal/ModalManager";
import Seo from "./hoc/seo/Seo";

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
import { token } from "./service/token";
import useMe from "./hooks/me";
import Recovery from "./components/Recovery/Recovery";
import Edit from "./components/Edit/Edit";
import { setPath } from "./store/menu/menuSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { useIsTabletDevice } from "./hooks/IsSmallDevice";
import useGoogleManager from "./hooks/googleManager";

const App: FC = () => {
  const title = import.meta.env.VITE_APP_TITLE;
  const description = import.meta.env.VITE_APP_DESCRIPTION;
  const url = import.meta.env.VITE_APP_URL;
  const { isYang } = useIsYang();
  const isAuth = useIsAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { getMeData } = useMe();
  const dispatch = useAppDispatch();
  const isTablet = useIsTabletDevice();
  const { id } = useAppSelector((state) => state.user.dataMe);
  const { addEvent } = useGoogleManager();

  useEffect(() => {
    if (isAuth) {
      if (!id) return;
      addEvent({ event: "", user_id: id });
    }
  }, [addEvent, id, isAuth]);

  useEffect(() => {
    const { pathname, hash } = location;

    if (pathname === "/" && hash === "#price") {
      if (isTablet) {
        const el = document.getElementById(paths.price);
        if (!el) return;

        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 200);
        return;
      }
      dispatch(setPath(paths.price));
    }

    if (pathname === `/${paths.young_talent}/` && hash === "#price") {
      navigate(`/${paths.young_talent}`);
      if (isTablet) {
        const el = document.getElementById(paths.price_young);

        if (!el) return;
        setTimeout(() => {
          el.scrollIntoView();
        }, 200);
        return;
      }
      dispatch(setPath(paths.price_young));
    }
  }, [dispatch, location]);

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
      getMeData();
    }
  }, []); // eslint-disable-line

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
            path={`${paths.recovery}/:id`}
            element={
              <ServicePage
                children={<Recovery />}
                title="Восстановление пароля"
              />
            }
          />

          <Route
            path={`${paths.edit}/:id_work`}
            element={
              <RequireAuth>
                {
                  <ServicePage
                    children={<Edit />}
                    title="Редактирование работы"
                  />
                }
              </RequireAuth>
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

          {/* <Route path="/:section" element={<HomePage />} /> */}

          <Route path="*" element={<HomePage />} />
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

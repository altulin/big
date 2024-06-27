import { FC } from "react";
import { Route, Routes } from "react-router-dom";
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

const App: FC = () => {
  const title = import.meta.env.VITE_APP_TITLE;
  const description = import.meta.env.VITE_APP_DESCRIPTION;
  const url = import.meta.env.VITE_APP_URL;

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
            path={paths.private}
            element={<RequireAuth>{/* <Private /> */ <h1>лк</h1>}</RequireAuth>}
          />

          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
      <ModalManager />
      {/* <Cursor /> */}
    </HelmetProvider>
  );
};

export default App;

import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Template from "./templates_pages/Template";
import RequireAuth from "./hoc/RequireAuth";
import ModalManager from "./components/modal/ModalManager";
import Seo from "./hoc/Seo";
// import Cursor from "./hoc/AnimatedCursor";
import { HelmetProvider } from "react-helmet-async";
import Promo from "@/components/promo/Promo";
import Steps from "@/components/steps/Steps";
import Nominations from "@/components/nominations/Nominations";
import { paths } from "./service/paths";
import { useIsTabletDevice } from "./hooks/IsSmallDevice";
import HomePage from "./pages/HomePage";

const App: FC = () => {
  const isTablet = useIsTabletDevice();

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
          {!isTablet ? (
            <>
              <Route index element={<Promo />} />
              <Route path={paths.steps} element={<Steps />} />
              <Route path={paths.nominations} element={<Nominations />} />
              <Route path="*" element={<Promo />} />
            </>
          ) : (
            <>
              <Route index element={<HomePage />} />
              <Route path="*" element={<HomePage />} />
            </>
          )}

          <Route
            path={paths.private}
            element={<RequireAuth>{/* <Private /> */ <h1>лк</h1>}</RequireAuth>}
          />
        </Route>
      </Routes>
      <ModalManager />
      {/* <Cursor /> */}
    </HelmetProvider>
  );
};

export default App;

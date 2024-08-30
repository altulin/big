/* eslint-disable @typescript-eslint/no-explicit-any */
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import style from "./JuryAccount.module.scss";
import JuryAccountListRowHead from "./JuryAccountListRowHead";
import { Form, Formik } from "formik";
import JuryAccountListContent from "./JuryAccountListContent";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { tabs, useCheckDeadline } from "./service";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { paths } from "@/service/paths";

const JuryAccountList: FC = () => {
  const location = useLocation();
  const { isShort } = useCheckDeadline();
  const [tabIndex, setTabIndex] = useState(0);
  const isTablet = useIsTabletDevice();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTablet) {
      navigate(`/${paths.profile}`);
    }
  }, [isTablet, navigate]);

  const getTabs = () => {
    return isShort ? tabs : [""];
  };

  return (
    <div className={clsx(style.list_wrapper)}>
      {isShort && (
        <h2 className={clsx(style.list_wrapper__title)}>шорт-лист</h2>
      )}

      <Tabs
        className={clsx(style.list_wrapper__tabs)}
        selectedTabPanelClassName={clsx(style["list_wrapper__panel--selected"])}
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className={clsx(style.list_wrapper__list)}>
          {getTabs().map((item, i) => {
            return (
              <Tab
                selectedClassName={clsx(style["list_wrapper__tab--selected"])}
                className={clsx(
                  style.list_wrapper__tab,
                  !isShort && style["list_wrapper__tab--hidden"],
                )}
                key={i}
              >
                {item}
              </Tab>
            );
          })}
        </TabList>

        {getTabs().map((item, i) => {
          return (
            <TabPanel className={clsx(style.list_wrapper__panel)} key={i}>
              <div className={clsx(style.list_wrapper__panel_inner)}>
                <ScrollBarComponent>
                  <Formik
                    initialValues={{
                      category: location.state?.values?.category || "",
                      nomination: location.state?.values?.nomination || "",
                      is_reviewed: location.state?.values?.is_reviewed || "",
                    }}
                    onSubmit={() => {}}
                    enableReinitialize
                  >
                    {(formik) => {
                      return (
                        <Form className={clsx(style.list)}>
                          <JuryAccountListRowHead />
                          <JuryAccountListContent
                            values={formik.values}
                            tabIndex={tabIndex}
                          />
                        </Form>
                      );
                    }}
                  </Formik>
                </ScrollBarComponent>
              </div>
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};
export default JuryAccountList;

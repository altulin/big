/* eslint-disable @typescript-eslint/no-explicit-any */
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryAccount.module.scss";
import JuryAccountListRowHead from "./JuryAccountListRowHead";
import { Form, Formik } from "formik";
import JuryAccountListContent from "./JuryAccountListContent";
import { useLocation } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useCheckShort } from "./service";

const JuryAccountList: FC = () => {
  const location = useLocation();
  const { isShort } = useCheckShort();

  const tabs = ["Основная", "Young Talent"];

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
      >
        <TabList className={clsx(style.list_wrapper__list)}>
          {getTabs().map((item, i) => {
            return (
              <Tab className={clsx(style.list_wrapper__tab)} key={i}>
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
                          <JuryAccountListContent values={formik.values} />
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

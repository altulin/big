/* eslint-disable @typescript-eslint/no-explicit-any */
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryAccount.module.scss";
import JuryAccountListRowHead from "./JuryAccountListRowHead";
import { Form, Formik } from "formik";
import JuryAccountListContent from "./JuryAccountListContent";
import { useLocation } from "react-router-dom";

const JuryAccountList: FC = () => {
  const location = useLocation();

  return (
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
  );
};
export default JuryAccountList;

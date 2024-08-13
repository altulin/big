/* eslint-disable @typescript-eslint/no-explicit-any */
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import clsx from "clsx";
import { FC } from "react";
import style from "./JuryAccount.module.scss";
import JuryAccountListRowHead from "./JuryAccountListRowHead";
import { Form, Formik } from "formik";
import JuryAccountListContent from "./JuryAccountListContent";

const JuryAccountList: FC = () => {
  return (
    <ScrollBarComponent>
      <Formik
        initialValues={{ category: "", nomination: "", is_reviewed: "" }}
        onSubmit={() => {}}
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

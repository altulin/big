/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import SubmissionContent from "../Pass/SubmissionContent";
import { useInitialValues } from "../Pass/formService";

const EditForm: FC<{ data?: any }> = ({ data }) => {
  const { createValidationSchema, getProperties } = useInitialValues();

  useEffect(() => {
    // console.log(data);
  }, [data]);

  return (
    <Formik
      initialValues={{ fields: [getProperties(data)] }}
      validationSchema={createValidationSchema()}
      onSubmit={() => {}}
    >
      {(formik) => {
        return (
          <Form>
            <SubmissionContent formik={formik} id={0} />
          </Form>
        );
      }}
    </Formik>
  );
};
export default EditForm;

import { useAppSelector } from "@/hooks/hook";
import { getValidationSchema } from "@/service/form/validation";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import style from "./Pass.module.scss";
import PassFormRadio from "./PassFormRadio";
import PassFormSubmission from "./PassFormSubmission";
import PassFormBuy from "./PassFormBuy";
import PassFormTotal from "./PassFormTotal";
import { useInitialValues } from "./formService";

const PassForm: FC = () => {
  const { works_amount } = useAppSelector((state) => state.pass);
  const { createInitialValues, createValidationSchema } = useInitialValues();

  // const makePayLoad = (values: any) => {
  //   const obj = { category, tickets_amount };
  // };

  useEffect(() => {
    createValidationSchema(works_amount);
  }, [works_amount]);

  return (
    <Formik
      initialValues={createInitialValues(works_amount)}
      validationSchema={createValidationSchema(works_amount)}
      onSubmit={async () => {
        // console.log(makePayLoad(values));
        // dispatch(
        //   setSuccessModal({
        //     text: "Поздравляем с успешной регистрацией!",
        //     comein: true,
        //   }),
        // );
        // console.log(values);
        // resetForm();
      }}
      enableReinitialize
    >
      {(formik) => {
        // console.log(formik.values);
        // console.log(formik.isValid && formik.dirty);
        return (
          <>
            <Form className={clsx(style.form)}>
              <PassFormRadio formik={formik} />
              <PassFormSubmission formik={formik} />
              <PassFormBuy formik={formik} />
              <PassFormTotal formik={formik} />
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
export default PassForm;

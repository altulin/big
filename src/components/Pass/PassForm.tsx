import { useAppSelector } from "@/hooks/hook";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC } from "react";
import style from "./Pass.module.scss";
import PassFormRadio from "./PassFormRadio";
import PassFormSubmission from "./PassFormSubmission";
import PassFormBuy from "./PassFormBuy";
import PassFormTotal from "./PassFormTotal";
import { useInitialValues } from "./formService";

const PassForm: FC = () => {
  const { createValidationSchema } = useInitialValues();
  const { category, categoryPitch } = useAppSelector((state) => state.category);

  // const makePayLoad = (values: any) => {
  //   const obj = { category, tickets_amount };
  // };

  return (
    <Formik
      initialValues={{
        category: category || "",
        categoryPitch: categoryPitch || "",
        fields: [
          {
            brand: "",
            name_work: "",
            nomination: "",
            deadlines: "",
            targets: "",
            target_audience: "",
            insight_and_idea: "",
            about_the_project: "",
            link: "",
            credits: "",
            project_image: "",
          },
        ],
      }}
      validationSchema={createValidationSchema()}
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
        // console.log(formik.values.fields[0]);
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

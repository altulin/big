/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/hooks/hook";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import style from "./Pass.module.scss";
import PassFormRadio from "./PassFormRadio";
import PassFormSubmission from "./PassFormSubmission";
import PassFormBuy from "./PassFormBuy";
import PassFormTotal from "./PassFormTotal";
import { useInitialValues } from "./formService";
import { useSendWorkMutation } from "@/store/rtk/orders/send_work";
import useWidget from "./widget";

const PassForm: FC = () => {
  const { createValidationSchema, getProperties } = useInitialValues();
  const { category, categoryPitch } = useAppSelector((state) => state.category);
  const [sendWork, { status }] = useSendWorkMutation();
  const { runWidget } = useWidget();

  const makePayLoad = (values: any) => {
    const { category, fields } = values;
    // const obj = { category };
    const works: any = [];

    fields.forEach((el: any) => {
      const {
        name_work,
        brand,
        nomination,
        deadlines,
        targets,
        insight_and_idea,
        credits,
        about_the_project,
        link,
        target_audience,
        project_image,
      } = el;

      const formData = new FormData();
      formData.append("project_image", project_image);

      const work = {
        title: name_work,
        brand,
        nomination,
        deadlines,
        goals: targets,
        idea: insight_and_idea,
        about_project: about_the_project,
        work_link: link,
        credits,
        target_audience,
        formData,
      };

      works.push(work);
    });

    return { category, works };
  };

  useEffect(() => {
    if (status === "fulfilled") {
      runWidget();
    }
  }, [runWidget, status]);

  return (
    <Formik
      initialValues={{
        category: category || "",
        categoryPitch: categoryPitch || "",
        fields: [getProperties()],
      }}
      validationSchema={createValidationSchema()}
      onSubmit={async (values, { resetForm }) => {
        // console.log(makePayLoad(values));
        sendWork(makePayLoad(values))
          .unwrap()
          .then(() => {
            resetForm();
          });
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

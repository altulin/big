import { useAppSelector } from "@/hooks/hook";
import { getValidationSchema } from "@/service/form/validation";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC } from "react";
import style from "./Pass.module.scss";
import PassFormRadio from "./PassFormRadio";
import PassFormSubmission from "./PassFormSubmission";
import PassFormBuy from "./PassFormBuy";
import PassFormTotal from "./PassFormTotal";

const PassForm: FC = () => {
  // const dispatch = useAppDispatch();
  const { category, categoryPitch } = useAppSelector((state) => state.category);

  return (
    <Formik
      initialValues={{
        project_image: null,
        buy: 0,
        total: 0,
        category: category,
        categoryPitch: categoryPitch,
        brand: "",
        name_work: "",
        nomination: "",
        // mail: "",
        // password: "",
        // confirm_password: "",
        // name: "",
        // company_name: "",
        // rule: true,
        // offer: true,
        // phone: "",
        // file: "",
      }}
      validationSchema={getValidationSchema([
        "project_image",
        "brand",
        "name_work",
        "nomination",
        "deadlines",
        "targets",
        "insight_and_idea",
        "target_audience",
        "about_the_project",
        "link",
        "credits",
        "file",
        // "mail",
        // "password",
        // "confirm_password",
        // "name",
        // "phone",
        // "rule",
        // "offer",
        // "file",
      ])}
      onSubmit={async (values) => {
        // dispatch(
        //   setSuccessModal({
        //     text: "Поздравляем с успешной регистрацией!",
        //     comein: true,
        //   }),
        // );

        console.log(values);
        // resetForm();
      }}
      enableReinitialize:true
    >
      {(formik) => {
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

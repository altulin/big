import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { getValidationSchema } from "@/service/form/validation";
import { setSuccessModal } from "@/store/modal/modalSlice";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC } from "react";
import style from "./Pass.module.scss";
import PassFormRadio from "./PassFormRadio";
import PassFormSubmission from "./PassFormSubmission";

const PassForm: FC = () => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.category);

  return (
    <Formik
      initialValues={{
        category: category,
        mail: "",
        password: "",
        confirm_password: "",
        name: "",
        company_name: "",
        rule: true,
        offer: true,
        phone: "",
        file: "",
      }}
      validationSchema={getValidationSchema([
        "mail",
        "password",
        "confirm_password",
        "name",
        "phone",
        "rule",
        "offer",
        "file",
      ])}
      onSubmit={async (values, { resetForm }) => {
        dispatch(
          setSuccessModal({
            text: "Поздравляем с успешной регистрацией!",
            comein: true,
          }),
        );
        resetForm();
      }}
    >
      {(formik) => {
        return (
          <>
            <Form className={clsx(style.form)}>
              <PassFormRadio formik={formik} />
              <PassFormSubmission formik={formik} />
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
export default PassForm;

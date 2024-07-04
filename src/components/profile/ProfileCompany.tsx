/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidationSchema } from "@/service/form/validation";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import style from "./Profile.module.scss";
import ProfileBoxHead from "./ProfileBoxHead";
import Upload from "../form/Upload";

const ProfileCompany: FC = () => {
  const [btnData, setBtnData] = useState<any>({
    type: "edit",
    title: "Мои компании",
    disabled: true,
    btnDisablred: false,
  });

  const handleBtn = (e: any, formik: any) => {
    const { type } = btnData;

    if (type === "edit") {
      e.preventDefault();
      setBtnData({
        ...btnData,
        type: "save",
        disabled: false,
      });
    }

    if (type === "save") {
      if (formik.dirty) {
        //
      } else {
        e.preventDefault();
        formik.setTouched({});
        setBtnData({
          ...btnData,
          type: "edit",
          disabled: true,
        });
      }
    }
  };

  return (
    <Formik
      initialValues={{
        file: "",
      }}
      validationSchema={getValidationSchema(["file"])}
      onSubmit={(values) => {
        console.log(values);
        // resetForm();

        setBtnData({
          ...btnData,
          type: "edit",
          disabled: true,
        });
      }}
    >
      {(formik) => {
        return (
          <Form className={clsx(style.form)}>
            <ProfileBoxHead
              isBtn={true}
              title={btnData.title}
              type={btnData.type}
              onClick={(e: any) => handleBtn(e, formik)}
              btnDisabled={!formik.isValid}
            />

            <div className={clsx(style.box)}>
              <Upload
                name="file"
                label={
                  !formik.values.file
                    ? "Прикрепить файл .doc"
                    : formik.values.file
                }
                accept=".doc, .docx"
                modifier="file-profile"
                disabled={btnData.disabled}
              ></Upload>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default ProfileCompany;

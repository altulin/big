/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidationSchema } from "@/service/form/validation";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import style from "./Profile.module.scss";
import ProfileBoxHead from "./ProfileBoxHead";
import Upload from "../form/Upload";
import { useAppSelector } from "@/hooks/hook";
import IconResset from "@/images/profile/resset.svg?react";

const ProfileCompany: FC = () => {
  const { company_name, company_details_file, phone_number, name, email } =
    useAppSelector((state) => state.user.dataMe);

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

  const handleReset = (formik: any) => {
    formik.setFieldValue("file", "");
  };

  return (
    <Formik
      initialValues={{
        file: "",
      }}
      validationSchema={getValidationSchema(["file"])}
      onSubmit={(values) => {
        console.log(values);

        const {} = values;
        const body = {
          phone_number: phone_number,
          name: name,
          email: email,
          company_name: company_name,
        };

        // putUserData(body);

        setBtnData({
          ...btnData,
          type: "edit",
          disabled: true,
        });
      }}
    >
      {(formik) => {
        // console.log(formik.errors.file + " err");
        // console.log(formik.values.file + ": value");

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
              <h3 className={clsx(style.box__title)}>{company_name}</h3>

              {btnData.disabled && (
                <a
                  className={clsx(style.box__download)}
                  href={`${
                    import.meta.env.VITE_APP_API_HOST
                  }${company_details_file}`}
                  download
                >
                  {typeof company_details_file === "string" &&
                    (company_details_file as string).split("/").pop()}
                </a>
              )}

              {!btnData.disabled && (
                <>
                  <Upload
                    formik={formik}
                    name="file"
                    label={
                      !formik.values.file
                        ? "Прикрепить файл .doc"
                        : "Файл прикреплен"
                    }
                    accept=".doc, .docx"
                    modifier="file-profile"
                    disabled={btnData.disabled}
                  ></Upload>

                  {formik.values.file && (
                    <button
                      type="button"
                      onClick={() => handleReset(formik)}
                      className={clsx(style.box__btn_reset)}
                    >
                      {(formik.values.file as any).name}

                      <IconResset />
                    </button>
                  )}
                </>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default ProfileCompany;

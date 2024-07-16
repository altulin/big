/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidationSchema } from "@/service/form/validation";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import style from "./Profile.module.scss";
import ProfileBoxHead from "./ProfileBoxHead";
import Upload from "../form/Upload";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import IconResset from "@/images/profile/resset.svg?react";
import { useEditMeMutation } from "@/store/rtk/user/editMe";
import useMe from "@/hooks/me";
import { setErrorModal, setSuccessModal } from "@/store/modal/modalSlice";

const ProfileCompany: FC = () => {
  const [putUserData, { status }] = useEditMeMutation();
  const dispatch = useAppDispatch();
  const { getMeData } = useMe();
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

  useEffect(() => {
    if (status === "rejected") {
      dispatch(
        setErrorModal(
          "Произошла ошибка при обновлении профиля. Необходимо авторизоваться",
        ),
      );
      getMeData();
    }

    if (status === "fulfilled") {
      dispatch(
        setSuccessModal({
          text: "Данные успешно обновлены",
          comein: false,
        }),
      );
      getMeData();
    }
  }, [dispatch, status]); // eslint-disable-line

  return (
    <Formik
      initialValues={{
        file: "",
      }}
      validationSchema={getValidationSchema(["file"])}
      onSubmit={(values) => {
        if (!phone_number || !name || !email || !company_name) {
          return;
        }

        const body = {
          phone_number: phone_number,
          name: name,
          email: email,
          company_name: company_name,
        };

        const formData = new FormData();
        for (const key in body)
          formData.append(key, body[key as keyof typeof body]);

        formData.append("company_details_file", (values as any).file);

        putUserData(formData);

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
              <h3 className={clsx(style.box__title)}>{company_name}</h3>

              {btnData.disabled && (
                <a
                  className={clsx(style.box__download)}
                  href={`${
                    import.meta.env.VITE_APP_API_HOST
                  }${company_details_file}`}
                  download
                >
                  Реквизиты компании
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

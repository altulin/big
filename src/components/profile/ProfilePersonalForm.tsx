/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import style from "./Profile.module.scss";
import { Form, Formik } from "formik";
import { getValidationSchema } from "@/service/form/validation";
import TextInput from "../form/TextInput";
import ProfileBoxHead from "./ProfileBoxHead";
import { onNameInput } from "@/service/form/masks/name";
import { onPhoneInput } from "@/service/form/masks/phone";
import useProfile from "@/hooks/profile";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import StringMask from "string-mask";
import { useEditMeMutation } from "@/store/rtk/user/editMe";
import { setErrorModal, setSuccessModal } from "@/store/modal/modalSlice";
import useMe from "@/hooks/me";

const ProfilePersonalForm: FC = () => {
  const formatter = new StringMask("+0 (000) 000-00-000");
  const { isIndividual } = useProfile();
  const [putUserData, { status }] = useEditMeMutation();
  const [btnData, setBtnData] = useState<any>({
    type: "edit",
    title: "Мои данные",
    disabled: true,
    btnDisablred: false,
  });
  const dispatch = useAppDispatch();
  const { getMeData } = useMe();

  const { phone_number, name, email, company_name } = useAppSelector(
    (state) => state.user.dataMe,
  );

  const formatPhone = (num: string) => {
    return formatter.apply(num.replace(/^[^0-9]+/gm, ""));
  };

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
          profile: true,
          title: "Профиль",
        }),
      );
      getMeData();
    }
  }, [dispatch, status]); // eslint-disable-line

  return (
    <Formik
      initialValues={{
        mail: email || "",
        name: name || "",
        phone: phone_number ? formatPhone(phone_number) : "",
        company_name: company_name || "",
      }}
      validationSchema={getValidationSchema([
        "mail",
        "name",
        "phone",
        "company_name",
      ])}
      onSubmit={(values) => {
        const { company_name, mail, name, phone } = values;
        const body = {
          phone_number: phone,
          name: name,
          email: mail,
          company_name: company_name,
        };

        putUserData(body);
        // resetForm();

        setBtnData({
          ...btnData,
          type: "edit",
          disabled: true,
        });
      }}
      enableReinitialize={true}
    >
      {(formik) => {
        // console.log(formik);

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
              <TextInput
                name="name"
                label="Имя:"
                placeholder="Укажите Имя"
                onInput={onNameInput}
                modifier="profile"
                disabled={btnData.disabled}
              />

              <TextInput
                name="phone"
                label="Телефон:"
                placeholder="+7 (___) ___-__-__"
                type="tel"
                onInput={onPhoneInput}
                modifier="profile"
                disabled={btnData.disabled}
              />

              <TextInput
                type="email"
                name="mail"
                label="E-mail:"
                placeholder="example@gmail.com"
                modifier="profile"
                disabled={btnData.disabled}
              />

              {isIndividual && (
                <TextInput
                  name="company_name"
                  label="Компания"
                  placeholder="Название компании, в которой работаете"
                  disabled={btnData.disabled}
                  modifier="profile"
                />
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default ProfilePersonalForm;

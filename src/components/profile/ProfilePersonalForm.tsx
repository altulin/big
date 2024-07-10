/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useState } from "react";
import style from "./Profile.module.scss";
import { Form, Formik } from "formik";
import { getValidationSchema } from "@/service/form/validation";
import TextInput from "../form/TextInput";
import ProfileBoxHead from "./ProfileBoxHead";
import { onNameInput } from "@/service/form/masks/name";
import { onPhoneInput } from "@/service/form/masks/phone";
import useProfile from "@/hooks/profile";
import { useAppSelector } from "@/hooks/hook";
import StringMask from "string-mask";

const ProfilePersonalForm: FC = () => {
  const formatter = new StringMask("+0 (000) 000-00-000");
  const { isIndividual } = useProfile();
  const [btnData, setBtnData] = useState<any>({
    type: "edit",
    title: "Мои данные",
    disabled: true,
    btnDisablred: false,
  });

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

  return (
    <Formik
      initialValues={{
        mail: email,
        name: name,
        phone: phone_number ? formatPhone(phone_number) : "",
        company_name: company_name,
      }}
      validationSchema={getValidationSchema([
        "mail",
        "name",
        "phone",
        "company_name",
      ])}
      onSubmit={(values) => {
        console.log(values);
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
                placeholder="(+7__)___-__-__"
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidationSchema } from "@/service/form/validation";
import { required } from "@/service/form/errText";
import * as yup from "yup";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC } from "react";
import style from "./Registration.module.scss";
import Radio from "./Radio";
import TextInput from "../form/TextInput";
import PasswordField from "../form/Password";
import { onNameInput } from "@/service/form/masks/name";
import Entity from "./Entity";
import Checkbox from "../form/Checkbox";
import Button from "../modal/template/Button";
import { useAppDispatch } from "@/hooks/hook";
import { setSuccessModal } from "@/store/modal/modalSlice";
import CompanyReg from "./Company";
import { onPhoneInput } from "@/service/form/masks/phone";
import { useSettigsQuery } from "@/store/rtk/main/settings";
import { useRegistrationMutation } from "@/store/rtk/user/registration";
import useGoogleManager from "@/hooks/googleManager";

// реквизиты (file) обязательны только для юрлица — тип берётся из значения формы
const validationSchema = getValidationSchema([
  "mail",
  "password",
  "confirm_password",
  "name",
  "phone",
  "rule",
  "offer",
  "company_name",
]).shape({
  file: yup.mixed().when("status", {
    is: "entity",
    then: (schema) => schema.required(required),
  }),
});

const FormRegistration: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useSettigsQuery(undefined);
  const [registration] = useRegistrationMutation();
  const { addEvent } = useGoogleManager();

  return (
    <Formik
      initialValues={{
        status: "individual",
        mail: "",
        password: "",
        confirm_password: "",
        name: "",
        company_name: "",
        rule: false,
        offer: false,
        phone: "",
        file: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const body = {
          phone_number: values.phone,
          name: values.name,
          email: values.mail,
          password: values.password,
          type: values.status,
          company_name: values.company_name,
        };

        const formData = new FormData();
        for (const key in body)
          formData.append(key, body[key as keyof typeof body]);

        if (values.status === "entity") {
          formData.append("company_details_file", (values as any).file);
        }

        return registration(formData)
          .unwrap()
          .then(() => {
            dispatch(
              setSuccessModal({
                text: "Поздравляем с успешной регистрацией!",
                comein: true,
              }),
            );

            resetForm();
            addEvent({ event: "registration-submit" });
          })
          .catch(() => {});
      }}
      enableReinitialize={true}
    >
      {(formik) => {
        {
          return (
            <>
              <Form className={clsx(style.form)}>
                <div className={clsx(style.radio)}>
                  <Radio label="Физическое лицо" value="individual" />
                  <Radio label="Юридическое лицо" value="entity" />
                </div>

                <TextInput
                  name="name"
                  label="Ф.И."
                  placeholder="Укажите Имя и Фамилию"
                  onInput={onNameInput}
                />

                <TextInput
                  name="phone"
                  label="Телефон"
                  placeholder="+7 (___) ___-__-__"
                  type="tel"
                  onInput={onPhoneInput}
                />

                <TextInput
                  type="email"
                  name="mail"
                  label="E-mail"
                  placeholder="example@gmail.com"
                />

                <PasswordField
                  name="password"
                  label="Пароль"
                  placeholder="Введите пароль"
                />

                <PasswordField
                  name="confirm_password"
                  label="Пароль"
                  placeholder="Повторите пароль"
                />

                {formik.values.status === "individual" && <CompanyReg />}

                {formik.values.status === "entity" && <Entity />}

                <Checkbox name="offer">
                  <a
                    className={clsx(style.form__rule_link)}
                    href={data?.cookies}
                    target="_blank"
                  >
                    Обработку персональных данных
                  </a>
                </Checkbox>

                <Checkbox name="rule">
                  <a
                    className={clsx(style.form__rule_link)}
                    href={data?.offer}
                    target="_blank"
                  >
                    Оферту
                  </a>
                </Checkbox>

                <div className={clsx(style.control)}>
                  <Button
                    type="submit"
                    label="Зарегистрироваться"
                    modifier="green"
                    disabled={
                      !(formik.isValid && formik.dirty) || formik.isSubmitting
                    }
                    className={clsx(style.button)}
                  />
                </div>
              </Form>
            </>
          );
        }
      }}
    </Formik>
  );
};
export default FormRegistration;

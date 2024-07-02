import { getValidationSchema } from "@/service/form/validation";
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
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setSuccessModal, stepTo } from "@/store/modal/modalSlice";
import CompanyReg from "./Company";
// import Add from "@/UI/add/Add";
import { onPhoneInput } from "@/service/form/masks/phone";

const FormRegistration: FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.reg);

  const clickHandle = () => {
    dispatch(stepTo({ auth: { step: 1 } }));
  };

  return (
    <Formik
      initialValues={{
        status: status,
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
              <div className={clsx(style.radio)}>
                <Radio
                  label="Физическое лицо"
                  value="individual"
                  formik={formik}
                />
                <Radio
                  label="Юридическое лицо"
                  value="entity"
                  formik={formik}
                />
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
                placeholder="(+7__)___-__-__"
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

              {status === "individual" && <CompanyReg />}

              {status === "entity" && <Entity formik={formik} />}

              <Checkbox name="rule" isChecked={formik.values.rule}>
                <a
                  className={clsx(style.form__rule_link)}
                  href={import.meta.env.VITE_APP_PERSONAL_OFFER}
                >
                  Оферту
                </a>
              </Checkbox>

              {status === "entity" && (
                <Checkbox name="offer" isChecked={formik.values.offer}>
                  <a
                    className={clsx(style.form__rule_link)}
                    href={import.meta.env.VITE_APP_PERSONAL_DATA}
                  >
                    Обработку персональных данных
                  </a>
                </Checkbox>
              )}

              <div className={clsx(style.control)}>
                <Button
                  type="submit"
                  label="Отправить"
                  modifier="green"
                  disabled={!(formik.isValid && formik.dirty)}
                />
                <Button
                  type="button"
                  label="Вход"
                  modifier="black"
                  onClick={clickHandle}
                />
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
export default FormRegistration;

import { FC } from "react";
import style from "./Registration.module.scss";
import clsx from "clsx";
import { getValidationSchema } from "@/service/form/validation";
import { Form, Formik } from "formik";
import TextInput from "../form/TextInput";
import { onNameInput } from "@/service/form/masks/name";
import { onPhoneInput } from "@/service/form/masks/phone";
import Radio from "./Radio";
import PasswordField from "../form/Password";
import Checkbox from "../form/Checkbox";

const ServicePage: FC = () => {
  return (
    <div className={clsx(style.registration)}>
      <div className={clsx(style.registration__inner)}>
        <Formik
          initialValues={{
            status: "individual",
            mail: "",
            password: "",
            rule: true,

            // name: "",
            // surname: "",
            // phone: "",
            // rule: true,
          }}
          validationSchema={getValidationSchema([
            "mail",
            "password",
            "confirm_password",
            "name",
          ])}
          onSubmit={async (values, { resetForm }) => {
            resetForm();
          }}
        >
          {(formik) => {
            const isIndividual = formik.values.status === "individual";

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

                  <TextInput
                    name="name"
                    label="Ф.И."
                    placeholder="Укажите Имя и Фамилию"
                    onInput={onNameInput}
                  />

                  {isIndividual && (
                    <TextInput
                      name="company_name"
                      label="Компания"
                      placeholder="Название компании, в которой работаете"
                    />
                  )}

                  {/* <TextInput
                    name="mail"
                    label="E-mail"
                    placeholder="Введите имя"
                    onInput={onNameInput}
                  />
                  <TextInput
                    name="surname"
                    label="Фамилия"
                    placeholder="Введите фамилию"
                    onInput={onNameInput}
                  /> */}

                  {/* <TextInput
                    type="tel"
                    name="phone"
                    label="Телефон"
                    placeholder="+7(999)999-99-99"
                    onInput={onPhoneInput}
                  /> */}

                  <Checkbox isChecked={formik.values.rule} />

                  <button
                    className={clsx(style.modal__btn_submit)}
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Регистрация
                  </button>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default ServicePage;

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

const ServicePage: FC = () => {
  return (
    <div className={clsx(style.registration)}>
      <div className={clsx(style.registration__inner)}>
        <Formik
          initialValues={{
            status: "individual",
            mail: "",

            name: "",
            surname: "",
            phone: "",
            rule: true,
          }}
          validationSchema={getValidationSchema([
            "name",
            "surname",
            "phone",

            "rule",
          ])}
          onSubmit={async (values, { resetForm }) => {
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

                  <TextInput
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
                  />

                  <TextInput
                    type="tel"
                    name="phone"
                    label="Телефон"
                    placeholder="+7(999)999-99-99"
                    onInput={onPhoneInput}
                  />

                  <TextInput name="rule" type="checkbox" modifier="checkbox">
                    <div className={clsx(style.checkbox)}>
                      <span className={clsx(style.checkbox__icon)}>
                        {/* {formik.values.rule && <IconRule />} */}
                      </span>
                      <span className={clsx(style.checkbox__text)}>
                        Согласие на обработку
                        <a
                          className={clsx(style.checkbox__link)}
                          href="#"
                          target="_blank"
                        >
                          персональных данных
                        </a>
                      </span>
                    </div>
                  </TextInput>

                  <button
                    className={clsx(style.modal__btn_submit)}
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Регистрация
                  </button>
                </Form>

                <p className={clsx(style.reg__service)}>
                  Уже есть аккаунт?
                  {/* <button className={clsx(style.reg__auth)} onClick={handleExit}>
                  Войти
                </button> */}
                </p>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default ServicePage;

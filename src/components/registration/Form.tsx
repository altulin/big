import { getValidationSchema } from "@/service/form/validation";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import style from "./Registration.module.scss";
import Radio from "./Radio";
import TextInput from "../form/TextInput";
import PasswordField from "../form/Password";
import { onNameInput } from "@/service/form/masks/name";
import Entity from "./Entity";
import Checkbox from "../form/Checkbox";
import Button from "../modal/template/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { stepTo } from "@/store/modal/modalSlice";
import CompanyReg from "./Company";
import Add from "@/UI/add/Add";

const FormRegistration: FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.reg);

  const [count, setCount] = useState(1);
  const [array, setArray] = useState<string[]>([""]);

  const clickHandle = () => {
    dispatch(stepTo({ auth: { step: 1 } }));
  };

  const addHandle = () => {
    if (count > 3) return;
    setCount(count + 1);
    setArray([...array, ""]);
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

              {status === "individual" && <CompanyReg />}

              {status === "entity" &&
                array.map((item, i) => <Entity key={i} count={i} />)}

              {status === "entity" && (
                <Add
                  className={clsx(style.add)}
                  label="Добавить еще компанию"
                  onClick={addHandle}
                />
              )}

              <Checkbox isChecked={formik.values.rule} />

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

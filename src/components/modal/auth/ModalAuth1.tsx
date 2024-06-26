import { Form, Formik } from "formik";
import Modal from "../template/Modal";
import style from "../template/Modal.module.scss";
import clsx from "clsx";
import { FC } from "react";
import { getValidationSchema } from "@/service/form/validation";
import TextInput from "@/components/form/TextInput";
import Button from "../template/Button";
import PasswordField from "@/components/form/Password";

const ModalAuth1: FC = () => {
  return (
    <Modal title="Вход">
      <div className={clsx(style.modal__form)}>
        <Formik
          initialValues={{}}
          validationSchema={getValidationSchema(["code"])}
          onSubmit={(values, { resetForm }) => {
            resetForm();
          }}
        >
          {(formik) => {
            return (
              <Form className={clsx(style.form)}>
                <TextInput
                  name="mail"
                  placeholder="example@gmail.com"
                  type="text"
                  label="E-mail"
                />
                <PasswordField
                  name="password"
                  placeholder="Введите пароль"
                  label="Пароль"
                />
                <button className={clsx(style.button_service)}></button>
                <Button
                  modifier="green"
                  type="submit"
                  label="Войти "
                  disabled={!(formik.isValid && formik.dirty)}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};
export default ModalAuth1;

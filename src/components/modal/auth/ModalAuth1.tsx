import { Form, Formik } from "formik";
import Modal from "../template/Modal";
import style from "../template/Modal.module.scss";
import clsx from "clsx";
import { FC } from "react";
import { getValidationSchema } from "@/service/form/validation";
import TextInput from "@/components/form/TextInput";
import Button from "../template/Button";
import PasswordField from "@/components/form/Password";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import { useAppDispatch } from "@/hooks/hook";
import { clearAllStep } from "@/store/modal/modalSlice";

const ModalAuth1: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClickReg = () => {
    navigate(paths.registration);
    dispatch(clearAllStep());
  };

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
                <button
                  className={clsx(
                    style.button_service,
                    style["button_service--right"],
                    style["button_service--top"],
                  )}
                >
                  Забыл пароль
                </button>
                <Button
                  modifier="green"
                  type="submit"
                  label="Войти "
                  disabled={!(formik.isValid && formik.dirty)}
                  className={clsx(style.auth__submit)}
                />

                <p className={clsx(style.acc)}>
                  <span>Ещё нет аккаунта?</span>
                  <button
                    className={clsx(style.button_service)}
                    onClick={handleClickReg}
                  >
                    Регистрация
                  </button>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};
export default ModalAuth1;

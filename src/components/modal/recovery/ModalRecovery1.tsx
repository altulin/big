import { FC, useEffect } from "react";
import Modal from "../template/Modal";
import clsx from "clsx";
import style from "../template/Modal.module.scss";
import { Form, Formik } from "formik";
import TextInput from "@/components/form/TextInput";
import { getValidationSchema } from "@/service/form/validation";
import Button from "../template/Button";
import { useSendLinkMutation } from "@/store/rtk/recovery/send";
import { setSuccessModal } from "@/store/modal/modalSlice";
import { useAppDispatch } from "@/hooks/hook";

const ModalRecovery1: FC = () => {
  const [sendLink, { status }] = useSendLinkMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(
        setSuccessModal({
          text: "Ссылка успешно отправлена на Вашу почту",
          comein: false,
        }),
      );
    }
  }, [status]);

  return (
    <Modal title="Смена пароля">
      <div className={clsx(style.modal__form)}>
        <Formik
          initialValues={{
            mail: "",
          }}
          validationSchema={getValidationSchema(["mail"])}
          onSubmit={(values) => {
            const body = {
              email: values.mail,
            };
            sendLink(body);
          }}
        >
          {(formik) => {
            return (
              <Form className={clsx(style.form)}>
                <p className={clsx(style.recovery__text)}>
                  Введите почту, на неё будет отправлена ссылка для
                  восстановления пароля.
                </p>
                <TextInput
                  type="email"
                  name="mail"
                  label="E-mail"
                  placeholder="example@gmail.com"
                />

                <Button
                  modifier="green"
                  type="submit"
                  label="сбросить пароль"
                  disabled={!(formik.isValid && formik.dirty)}
                  className={clsx(style.auth__submit)}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};
export default ModalRecovery1;

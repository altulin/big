import clsx from "clsx";
import style from "./Recovery.module.scss";
import { FC, useEffect } from "react";
import { Form, Formik } from "formik";
import { getValidationSchema } from "@/service/form/validation";
import PasswordField from "../form/Password";
import Checkbox from "../form/Checkbox";
import { useSettigsQuery } from "@/store/rtk/main/settings";
import styleCheck from "@/components/registration/Registration.module.scss";
import Button from "../modal/template/Button";
import { useUpdatePasswordMutation } from "@/store/rtk/recovery/update_password";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hook";
import { setSuccessModal } from "@/store/modal/modalSlice";

const Recovery: FC = () => {
  const { data } = useSettigsQuery(undefined);
  const [updatePass, { status }] = useUpdatePasswordMutation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(
        setSuccessModal({
          text: "Ваш пароль успешно изменён!",
          title: "Смена пароля",
          comein: true,
        }),
      );
      navigate("/");
    }

    if (status === "rejected") {
      navigate("/");
    }
  }, [dispatch, navigate, status]);

  return (
    <section className={clsx(style.recovery)}>
      <div className={clsx(style.recovery__inner)}>
        <h3 className={clsx(style.recovery__title)}>
          Придумайте новый пароль.
        </h3>

        <Formik
          initialValues={{
            password: "",
            confirm_password: "",
            offer: true,
          }}
          validationSchema={getValidationSchema([
            "password",
            "confirm_password",
            "offer",
          ])}
          onSubmit={(values, { resetForm }) => {
            const body = { password: values.password, recovery_token: id };
            updatePass(body)
              .unwrap()
              .then(() => resetForm());
          }}
        >
          {(formik) => {
            return (
              <Form>
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

                <Checkbox name="offer" isChecked={formik.values.offer}>
                  <a
                    className={clsx(styleCheck.form__rule_link)}
                    href={data?.policy}
                    target="_blank"
                  >
                    Обработку персональных данных
                  </a>
                </Checkbox>

                <Button
                  label="Сохранить"
                  modifier="green"
                  className={clsx(style.button)}
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export default Recovery;

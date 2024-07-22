import { Form, Formik } from "formik";
import Modal from "../template/Modal";
import style from "../template/Modal.module.scss";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { getValidationSchema } from "@/service/form/validation";
import TextInput from "@/components/form/TextInput";
import Button from "../template/Button";
import PasswordField from "@/components/form/Password";
import { useNavigate } from "react-router-dom";
import { paths } from "@/service/paths";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { clearAllStep, stepTo } from "@/store/modal/modalSlice";
import { useAuthorizationMutation } from "@/store/rtk/user/authorization";
import { onPhoneInput } from "@/service/form/masks/phone";
import { TOKEN } from "@/service/const";
import { useGetMeMutation } from "@/store/rtk/user/me";
import { setUserData } from "@/store/user/userSlice";
import { setMenuControl } from "@/store/menu/menuSlice";
import useGoogleManager from "@/hooks/googleManager";

const ModalAuth1: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [authorization, authData] = useAuthorizationMutation();
  const [getMe, meData] = useGetMeMutation();
  const { phone_number } = useAppSelector((state) => state.user.dataMe);
  const { addEvent } = useGoogleManager();

  const handleClickReg = () => {
    dispatch(setMenuControl(false));
    navigate(paths.registration);
    dispatch(clearAllStep());
  };

  useEffect(() => {
    const { isSuccess, status } = authData;

    if (status !== "fulfilled") return;
    if (isSuccess) {
      localStorage.clear();
      localStorage.setItem(TOKEN, authData.data.access);
      getMe(undefined).unwrap();
    }
  }, [authData, dispatch, getMe]);

  useEffect(() => {
    const { isSuccess, data, status } = meData;

    if (status !== "fulfilled") return;
    if (isSuccess) {
      dispatch(setUserData(data));
    }
  }, [dispatch, meData]);

  useEffect(() => {
    if (!phone_number) return;

    dispatch(clearAllStep());
    navigate(paths.private);
  }, [dispatch, navigate, phone_number]);

  return (
    <Modal title="Вход">
      <div className={clsx(style.modal__form)}>
        <Formik
          initialValues={{
            phone: "",
            password: "",
          }}
          validationSchema={getValidationSchema(["phone", "password"])}
          onSubmit={(values) => {
            dispatch(setMenuControl(false));
            const { phone, password } = values;

            const dataObj: {
              password: string;
              phone_number: string;
            } = {
              password,
              phone_number: phone,
            };

            authorization(dataObj).unwrap();
          }}
        >
          {(formik) => {
            return (
              <Form className={clsx(style.form)}>
                <TextInput
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  type="tel"
                  label="Логин"
                  onInput={onPhoneInput}
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
                  type="button"
                  onClick={() => {
                    dispatch(setMenuControl(false));
                    dispatch(stepTo({ recovery: { step: 1 } }));
                  }}
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
                    type="button"
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

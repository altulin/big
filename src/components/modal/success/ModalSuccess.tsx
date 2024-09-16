import { FC } from "react";
import Modal from "../template/Modal";
import style from "../template/Modal.module.scss";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { clearAllStep, stepTo } from "@/store/modal/modalSlice";
import { HashLink } from "react-router-hash-link";
import { paths } from "@/service/paths";

const ModalSuccess: FC = () => {
  const { modalState } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(stepTo({ auth: { step: 1 } }));
  };

  return (
    <Modal title={modalState?.success?.title}>
      <div className={clsx(style.success)}>
        <div className={clsx(style.success__inner)}>
          <h2 className={clsx(style.success__title)}>
            {modalState?.success?.text}
          </h2>
          {modalState?.success?.comein && (
            <button
              onClick={handleExit}
              className={clsx(style.success__button)}
            >
              Войти
            </button>
          )}

          {modalState?.success?.profile && (
            <HashLink
              to={`/${paths.profile}`}
              className={clsx(style.success__button)}
              onClick={() => dispatch(clearAllStep())}
            >
              Вернуться в профиль
            </HashLink>
          )}

          {modalState?.success?.look && (
            <a
              className={clsx(style.success__button)}
              href="https://nuum.ru/channel/bigpicturefestival"
              target="_blank"
            >
              Смотреть
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default ModalSuccess;

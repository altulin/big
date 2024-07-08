import { FC } from "react";
import Modal from "../template/Modal";
import style from "../template/Modal.module.scss";
import clsx from "clsx";
import { useAppSelector } from "@/hooks/hook";

const ModalError: FC = () => {
  const { modalState } = useAppSelector((state) => state.modal);

  return (
    <Modal>
      <div className={clsx(style.modal_error)}>
        <div className={clsx(style["modal_error__inner"])}>
          <h2 className={clsx(style.modal__title, style["modal_error__title"])}>
            {modalState?.error?.text}
          </h2>

          {/* <button className={clsx(style.modal_error__button)}>Войти</button> */}
        </div>
      </div>
    </Modal>
  );
};
export default ModalError;

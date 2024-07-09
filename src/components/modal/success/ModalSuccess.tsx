import { FC } from "react";
import Modal from "../template/Modal";
import style from "../template/Modal.module.scss";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { stepTo } from "@/store/modal/modalSlice";

const ModalSuccess: FC = () => {
  const { modalState } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(stepTo({ auth: { step: 1 } }));
  };

  return (
    <Modal>
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
        </div>
      </div>
    </Modal>
  );
};
export default ModalSuccess;

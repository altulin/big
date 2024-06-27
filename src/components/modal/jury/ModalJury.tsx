import Modal from "../template/Modal";
import style from "../template/Modal.module.scss";
import clsx from "clsx";
import { FC } from "react";

const ModalJury1: FC = () => {
  return (
    <Modal title="Член жюри">
      <div className={clsx(style.modal__form)}></div>
    </Modal>
  );
};
export default ModalJury1;

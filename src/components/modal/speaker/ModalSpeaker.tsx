import Modal from "../template/Modal";
import style from "../template/Modal.module.scss";
import clsx from "clsx";
import { FC } from "react";

const ModalSpeaker: FC = () => {
  return (
    <Modal modifier="speaker">
      <div className={clsx(style.modal__form, style.speaker)}>
        <figure className={clsx(style.speaker__figure)}>
          <img src="" alt="" />
        </figure>

        <h2 className={clsx(style.speaker__title)}>Adam Bentel</h2>
        <p className={clsx(style.speaker__job)}>оператор-постановщик, ЮАР</p>
        <p className={clsx(style.speaker__description)}>
          Родился 18 апреля 1955 года в семье ленинградских интеллигентов. Его
          отец (Василий Григорьевич, 1918—2007) был преподавателем в ЛИСИ, а
          мать (Галина Флорентьевна Науменко-Брайтигам[2], 1922—2010) —
          работником библиотеки[3][4]. В детстве музыкой не занимался.{" "}
        </p>
      </div>
    </Modal>
  );
};
export default ModalSpeaker;

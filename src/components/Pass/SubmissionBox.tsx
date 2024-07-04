import clsx from "clsx";
import { FC, ReactNode, useState } from "react";
import style from "./Pass.module.scss";
import IconDelete from "@/images/pass/basket.svg?react";

const SubmissionBox: FC<{ children?: ReactNode }> = ({ children }) => {
  const [isVisible, setVisible] = useState(true);

  if (!isVisible) return null;

  const handleDelete = () => {
    setVisible(false);
  };

  return (
    <div className={clsx(style.sub)}>
      <div className={clsx(style.discount)}>
        <span className={clsx(style.discount__label)}>Стоимость подачи:</span>
        <span className={clsx(style.discount__value, style.discount__content)}>
          <span>11 000</span>
          <span> </span>
          <span>₽</span>
        </span>
        <span className={clsx(style.discount__price, style.discount__content)}>
          <span>10 000</span>
          <span> </span>
          <span>₽</span>
        </span>
      </div>

      <button onClick={handleDelete} className={clsx(style.delete)}>
        <IconDelete />
      </button>

      {children}
    </div>
  );
};
export default SubmissionBox;

import clsx from "clsx";
import { FC } from "react";
import style from "./Add.module.scss";
import IconAdd from "@/images/svg/add.svg?react";

interface IAdd {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Add: FC<IAdd> = ({ label, onClick, className }) => {
  return (
    <button
      type="button"
      className={clsx(style.button, className)}
      onClick={onClick}
    >
      <IconAdd />
      <span className={clsx(style.button__text)}>{label}</span>
    </button>
  );
};
export default Add;

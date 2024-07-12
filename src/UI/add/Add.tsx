import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import style from "./Add.module.scss";
import IconAdd from "@/images/svg/add.svg?react";

interface IAdd {
  label: string;
  onClick?: () => void;
  className?: string;
  isClick?: boolean;
}

const Add: FC<IAdd> = ({ label, onClick, className, isClick = false }) => {
  const refBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isClick) return;

    refBtn.current?.click();
  }, [isClick]);

  return (
    <button
      ref={refBtn}
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

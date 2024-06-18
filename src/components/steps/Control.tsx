import { FC } from "react";
import style from "./Steps.module.scss";
import clsx from "clsx";
import IconArr from "@/images/step/iconStepArr.svg?react";

const ControlBtn: FC<{ dir: "prev" | "next"; handleClick?: () => void }> = ({
  dir,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      className={clsx(style.button_slider, style[`button_slider--${dir}`])}
    >
      <IconArr />
    </button>
  );
};
export default ControlBtn;

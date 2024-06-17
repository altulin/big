import clsx from "clsx";
import { FC } from "react";
import style from "./Promo.module.scss";
import IconArr from "@/images/promo/arr.svg?react";

const Button: FC<{ dir: "prev" | "next" }> = ({ dir }) => {
  return (
    <button
      className={clsx(style.button_slider, style[`button_slider--${dir}`])}
    >
      <IconArr />
    </button>
  );
};

const Controls: FC = () => {
  return (
    <div className={clsx(style.controls)}>
      <div className={clsx(style.controls__inner)}>
        <Button dir="prev" />
        <Button dir="next" />
      </div>
    </div>
  );
};
export default Controls;

import clsx from "clsx";
import { FC } from "react";
import style from "./Modal.module.scss";

interface IButton {
  type?: "button" | "submit";
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  modifier: "green" | "black";
  className?: string;
}

const Button: FC<IButton> = ({
  type = "button",
  onClick,
  label,
  disabled = false,
  className,
  modifier,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        style.button,
        style[`button--${modifier}`],
        className,
        disabled && style["button--disabled"],
      )}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;

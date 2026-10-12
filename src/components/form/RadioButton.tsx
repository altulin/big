import { FC, ReactNode, useId } from "react";
import clsx from "clsx";
import style from "./Form.module.scss";
import styleRadio from "../registration/Registration.module.scss";
import useIsYang from "@/hooks/isYang";

// Радиокнопка без Formik — для значений, которые живут в Redux.
// Разметка повторяет Radio (TextInput + Container) с modifier="radio".
interface IRadioButton {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  icon?: ReactNode;
  disabled?: boolean;
}

const RadioButton: FC<IRadioButton> = ({
  label,
  name,
  value,
  checked,
  onSelect,
  icon = null,
  disabled = false,
}) => {
  const id = useId();
  const { isYang } = useIsYang();

  return (
    <div
      className={clsx(
        style.container,
        style["container--radio"],
        styleRadio.radio__item,
      )}
    >
      <label className={clsx(style.label, style["label--radio"])} htmlFor={id}>
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => onSelect(value)}
          className={clsx(
            styleRadio.radio__item,
            style.input,
            style["input--radio"],
            isYang && style["input--yang"],
          )}
        />
        <div className={clsx(styleRadio.radio__icon)}>
          {checked && <div className={clsx(styleRadio.radio__active)}></div>}
        </div>
        <div className={clsx(styleRadio.radio__text)}>
          {label}

          {icon}
        </div>
      </label>
    </div>
  );
};

export default RadioButton;

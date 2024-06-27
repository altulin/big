import { FC } from "react";
import TextInput from "./TextInput";
import clsx from "clsx";
import style from "./Form.module.scss";
import IconRule from "@/images/svg/rule.svg?react";

interface ICheckbox {
  className?: string;
  href?: string;
  isChecked?: boolean;
}

const Checkbox: FC<ICheckbox> = ({ className, href, isChecked }) => {
  return (
    <TextInput name="rule" type="checkbox" modifier="checkbox">
      <div className={clsx(style.checkbox, className)}>
        <span className={clsx(style.checkbox__icon)}>
          {isChecked && <IconRule />}
        </span>
        <span className={clsx(style.checkbox__text)}>
          Я даю свое согласие на
          <a className={clsx(style.checkbox__link)} href={href} target="_blank">
            Обработку персональных данных
          </a>
        </span>
      </div>
    </TextInput>
  );
};
export default Checkbox;

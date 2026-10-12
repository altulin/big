import { FC } from "react";
import { useField } from "formik";
import TextInput from "./TextInput";
import clsx from "clsx";
import style from "./Form.module.scss";
import IconRule from "@/images/svg/rule.svg?react";

interface ICheckbox {
  className?: string;
  href?: string;
  children?: JSX.Element;
  name: string;
}

const Checkbox: FC<ICheckbox> = ({ className, children, name }) => {
  const [field] = useField({ name, type: "checkbox" });

  return (
    <TextInput name={name} type="checkbox" modifier="checkbox">
      <div className={clsx(style.checkbox, className)}>
        <span className={clsx(style.checkbox__icon)}>
          {field.checked && <IconRule />}
        </span>
        <span className={clsx(style.checkbox__text)}>
          <span>Я даю свое согласие на </span>
          {children}
        </span>
      </div>
    </TextInput>
  );
};
export default Checkbox;

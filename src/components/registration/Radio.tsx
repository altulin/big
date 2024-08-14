/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Registration.module.scss";
import clsx from "clsx";
import TextInput from "../form/TextInput";
import { useField } from "formik";

interface IRadio {
  label: string;
  name?: string;
  value: string;
  formik?: any;
  icon?: any;
}

const Radio: FC<IRadio> = ({
  label,
  value,

  name = "status",
  icon = null,
}) => {
  const [field] = useField(name);

  return (
    <TextInput
      className={clsx(style.radio__item)}
      name={name}
      type="radio"
      modifier="radio"
      value={value}
    >
      <>
        <div className={clsx(style.radio__icon)}>
          {field.value === value && (
            <div className={clsx(style.radio__active)}></div>
          )}
        </div>
        <div className={clsx(style.radio__text)}>
          {label}

          {icon && icon}
        </div>
      </>
    </TextInput>
  );
};
export default Radio;

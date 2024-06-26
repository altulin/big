/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import style from "./Registration.module.scss";
import clsx from "clsx";
import TextInput from "../form/TextInput";

interface IRadio {
  label: string;

  value: string;
  formik?: any;
}

const Radio: FC<IRadio> = ({ label, value, formik }) => {
  return (
    <TextInput name="status" type="radio" modifier="radio" value={value}>
      <>
        <div className={clsx(style.radio__icon)}>
          {formik && formik.values.status === value && (
            <div className={clsx(style.radio__active)}></div>
          )}
        </div>
        <div className={clsx(style.radio__text)}>{label}</div>
      </>
    </TextInput>
  );
};
export default Radio;

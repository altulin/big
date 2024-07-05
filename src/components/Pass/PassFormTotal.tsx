/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import style from "./Pass.module.scss";
import clsx from "clsx";
import useProfile from "@/hooks/profile";
import { Field, useField } from "formik";

const PassFormTotal: FC<{ formik: any }> = ({ formik }) => {
  const { isIndividual } = useProfile();
  const [meta] = useField({ name: "buy" });

  useEffect(() => {
    formik.setFieldValue("total", meta.value);
  }, [meta.value, formik.values.total]);

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Итог" isBtn={false} />
      <div className={clsx(style.box__inner, style.total)}>
        <div className={clsx(style.total__content)}>
          <p className={clsx(style.total__title)}>К оплате:</p>

          <Field
            className={clsx(style.total__input)}
            type="text"
            name="total"
            value={formik.values.total + " ₽"}
            readOnly
            size={10}
          />
        </div>

        <button
          type="submit"
          className={clsx(style.total__btn)}
          disabled={!(formik.isValid && formik.dirty)}
        >
          {isIndividual ? "Перейти к оплате" : "Далее"}
        </button>
      </div>
    </div>
  );
};
export default PassFormTotal;

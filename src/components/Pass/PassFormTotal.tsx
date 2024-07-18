/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import style from "./Pass.module.scss";
import clsx from "clsx";
import useProfile from "@/hooks/profile";
import usePrice from "@/hooks/price";

const PassFormTotal: FC<{ formik: any }> = ({ formik }) => {
  const { isIndividual } = useProfile();
  const { data } = usePrice();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={clsx(style.box)}>
      <ProfileBoxHead title="Итог" isBtn={false} />
      <div className={clsx(style.box__inner, style.total)}>
        <div className={clsx(style.total__content)}>
          <p className={clsx(style.total__title)}>К оплате:</p>

          <span className={clsx(style.total__input)}>
            {(data as any)?.order_price + " ₽"}
          </span>
        </div>

        <button
          type="submit"
          className={clsx(style.total__btn)}
          disabled={!(formik.isValid && formik.dirty)}
        >
          {!isIndividual && "Далее"}
          {isIndividual && (data as any)?.order_price === 0
            ? "Отправить"
            : "Перейти к оплате"}
        </button>
      </div>
    </div>
  );
};
export default PassFormTotal;

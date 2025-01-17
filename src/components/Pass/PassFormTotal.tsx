/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import style from "./Pass.module.scss";
import clsx from "clsx";
import useProfile from "@/hooks/profile";
import usePrice from "@/hooks/price";

const PassFormTotal: FC<{ formik?: any; isLoading?: boolean }> = ({
  formik,
  isLoading,
}) => {
  const { isIndividual } = useProfile();
  const { data } = usePrice();

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
          className={clsx(
            style.total__btn,
            isLoading && style.total__btn_loading,
          )}
          disabled={!(formik.isValid && formik.dirty)}
        >
          {!isIndividual && "Далее"}
          {isIndividual && (data as any)?.order_price === 0 && "Отправить"}
          {isIndividual &&
            (data as any)?.order_price !== 0 &&
            "Перейти к оплате"}
        </button>
      </div>
    </div>
  );
};
export default PassFormTotal;

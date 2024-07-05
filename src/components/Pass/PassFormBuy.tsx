/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import style from "./Pass.module.scss";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import IconMinus from "@/images/form/minus.svg?react";
import IconPlus from "@/images/form/plus.svg?react";
import { Field, useField } from "formik";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Button: FC<{ type: "add" | "remove"; onClick: any }> = ({
  type,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(style.buy__counter)}
    >
      {type === "add" && <IconPlus />}
      {type === "remove" && <IconMinus />}
    </button>
  );
};

const PassFormBuy: FC<{ formik: any }> = ({ formik }) => {
  const [counter, setCounter] = useState(0);
  const isTablet = useIsTabletDevice();

  const price = 15000;
  const [meta] = useField({ name: "buy" });

  useEffect(() => {
    formik.setFieldValue("buy", price * counter);
  }, [counter]);

  return (
    <div className={clsx(style.box, style.buy)}>
      <ProfileBoxHead
        title="Покупка билетов на церемонию награждения"
        isBtn={false}
      />

      <div className={clsx(style.box__inner, style.buy)}>
        <div className={clsx(style.buy__head)}>
          <p className={clsx(style.buy__text)}>
            Билеты на финальную церемонию награждения 3 октября 2024 года.
          </p>
          <p className={clsx(style.buy__text)}>
            После покупки билеты будут отправлены на почту, указанную при
            регистрации.
          </p>
        </div>

        <div className={clsx(style.counter)}>
          {!isTablet && (
            <div className={clsx(style.counter__head)}>
              <p className={clsx(style.counter__title)}>Цена билета</p>
              <p className={clsx(style.counter__title)}>Кол-во билетов</p>
              <p className={clsx(style.counter__title)}>Итог</p>
            </div>
          )}

          <div className={clsx(style.counter__body)}>
            {isTablet && (
              <p className={clsx(style.counter__title)}>Цена билета</p>
            )}
            <p
              className={clsx(
                style.counter__body_item,
                style.counter__body_num,
              )}
            >
              <span className={clsx(style.counter__body_val)}>{price}</span>
              <span>₽</span>
            </p>
            {isTablet && (
              <p className={clsx(style.counter__title)}>Кол-во билетов</p>
            )}
            <div
              className={clsx(
                style.counter__body_item,
                style.counter__body_counter,
              )}
            >
              <Button
                type="remove"
                onClick={() =>
                  setCounter((prev) => {
                    if (prev === 0) return 0;
                    return prev - 1;
                  })
                }
              />

              <span className={clsx(style.counter__body_value)}>{counter}</span>

              <Button
                type="add"
                onClick={() => setCounter((prev) => prev + 1)}
              />
            </div>
            {isTablet && <p className={clsx(style.counter__title)}>Итог</p>}
            <p
              className={clsx(
                style.counter__body_item,
                style.counter__body_num,
                style.counter__body_input,
              )}
            >
              <Field
                className={clsx(style.buy__input)}
                type="text"
                name="buy"
                value={meta.value + " ₽"}
                readOnly
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PassFormBuy;

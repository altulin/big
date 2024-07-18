/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC, useEffect } from "react";
import style from "./Pass.module.scss";
import ProfileBoxHead from "../profile/ProfileBoxHead";
import IconMinus from "@/images/form/minus.svg?react";
import IconPlus from "@/images/form/plus.svg?react";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setTicketsAmount } from "@/store/pass/passSlice";
import { useSettigsQuery } from "@/store/rtk/main/settings";

const Button: FC<{ type: "add" | "remove"; onClick?: any }> = ({
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

const PassFormBuy: FC<{ formik?: any }> = () => {
  // const [counter, setCounter] = useState(0);
  const isTablet = useIsTabletDevice();
  const { tickets_amount } = useAppSelector((state) => state.pass);
  const dispatch = useAppDispatch();
  const { category, categoryPitch } = useAppSelector((state) => state.category);
  const { data } = useSettigsQuery(undefined);

  useEffect(() => {
    dispatch(setTicketsAmount(0));
  }, [dispatch, category, categoryPitch]);

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
              <span className={clsx(style.counter__body_val)}>
                {data?.ticket_price && data?.ticket_price}
              </span>
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
                onClick={() => {
                  if (tickets_amount === 0) return 0;
                  dispatch(setTicketsAmount(tickets_amount - 1));
                }}
              />

              <span className={clsx(style.counter__body_value)}>
                {tickets_amount}
              </span>

              <Button
                type="add"
                onClick={() => dispatch(setTicketsAmount(tickets_amount + 1))}
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
              {data?.ticket_price && (
                <span>{tickets_amount * data?.ticket_price}</span>
              )}

              <span>₽</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PassFormBuy;

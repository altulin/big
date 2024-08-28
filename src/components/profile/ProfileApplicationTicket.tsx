/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Profile.module.scss";
import { format } from "date-fns";

interface IItem {
  tickets_cost: number;
  tickets_amount: number;
  updated_at: string;
}

const ProfileApplicationTicket: FC<{ item: IItem }> = ({ item }) => {
  const { tickets_cost, tickets_amount, updated_at } = item;

  return (
    <div className={clsx(style.ticket)}>
      <h3 className={clsx(style.ticket__title)}>
        <span>Покупка от</span>
        <span>{format(updated_at, "dd.MM.yyyy")}</span>
      </h3>

      <div className={clsx(style.ticket__content)}>
        <ul className={clsx(style.ticket__list)}>
          <li className={clsx(style.ticket__item)}>
            <span>Билет на церемонию награждения</span>
            <span className={clsx(style.ticket__value)}>
              {`${tickets_amount} шт.`}{" "}
            </span>
          </li>
          <li className={clsx(style.ticket__item)}>
            <span>Сумма:</span>
            <span
              className={clsx(style.ticket__value)}
            >{`${tickets_cost} ₽`}</span>
          </li>
        </ul>
        <p className={clsx(style.ticket__text)}>
          Если вы передумали приходить на церемонию награждения, свяжитесь с
          нами для возврата билета!
        </p>
      </div>
    </div>
  );
};
export default ProfileApplicationTicket;

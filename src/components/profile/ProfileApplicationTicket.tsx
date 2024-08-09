/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Profile.module.scss";

interface IItem {
  cost: number;
}

const ProfileApplicationTicket: FC<{ item: any }> = ({ item }) => {
  return (
    <div className={clsx(style.ticket)}>
      <h3 className={clsx(style.ticket__title)}>
        <span>Покупка от</span>
        <span>09.08.2024</span>
      </h3>

      <div className={clsx(style.ticket__content)}>
        <ul className={clsx(style.ticket__list)}>
          <li className={clsx(style.ticket__item)}>
            <span>Билет на церемонию награждения</span>
            <span className={clsx(style.ticket__value)}> ₽</span>
          </li>
          <li className={clsx(style.ticket__item)}>
            <span>Сумма:</span>
            <span className={clsx(style.ticket__value)}>1 месяц</span>
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

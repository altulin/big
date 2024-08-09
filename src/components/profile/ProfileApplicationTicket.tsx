import clsx from "clsx";
import { FC } from "react";
import style from "./Profile.module.scss";

const ProfileApplicationTicket: FC = () => {
  return (
    <div className={clsx(style.ticket)}>
      <div className={clsx(style.ticket__header)}>
        <h3 className={clsx(style.ticket__title)}>
          <span>Покупка от</span>
          <span>09.08.2024</span>
        </h3>
      </div>

      <div className={clsx(style.ticket__content)}>
        <ul className={clsx(style.ticket__list)}>
          <li className={clsx(style.ticket__item)}>
            <span>Билет на церемонию награждения</span>
            <span>100 000 ₽</span>
          </li>
          <li className={clsx(style.ticket__item)}>
            <span>Сумма:</span>
            <span>1 месяц</span>
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

import clsx from "clsx";
import style from "./Profile.module.scss";
import { FC } from "react";

const ProfileApplicationItemTicket: FC = () => {
  return (
    <div className={clsx(style.item)}>
      <div className={clsx(style.header)}>
        <p className={clsx(style.header__text)}>
          <span>Билеты</span>
        </p>
      </div>

      <div className={clsx(style.item__inner)}>
        <div className={clsx(style.ticket__content)}>
          <ul className={clsx(style.ticket__list)}>
            <li className={clsx(style.ticket__item)}>
              <span>Билет на церемонию награждения</span>
              <span className={clsx(style.ticket__value)}>{`${20} шт.`} </span>
            </li>
            <li className={clsx(style.ticket__item)}>
              <span>Сумма:</span>
              <span className={clsx(style.ticket__value)}>{`${10000} ₽`}</span>
            </li>
          </ul>
          <p className={clsx(style.ticket__text)}>
            Если вы передумали приходить на церемонию награждения, свяжитесь с
            нами для возврата билета!
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfileApplicationItemTicket;

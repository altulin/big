import clsx from "clsx";
import style from "./Festival.module.scss";
import { FC } from "react";

const Festival: FC = () => {
  return (
    <section className={clsx(style.festival)}>
      <div className={clsx(style.festival__inner)}>
        <h2 className={clsx(style.title)}>
          <span>Манифест</span>
        </h2>

        <div className={clsx(style.content)}>
          <div className={clsx(style.content__info)}>
            <div className={clsx(style.content__inner)}>
              <p className={clsx(style.content__text)}>
                Индустрия видеопроизводства в России стремительно развивается. С
                каждым годом появляется всё больше экспериментальных работ,
                новых форматов и технических решений. Но имена многих талантов
                остаются неуслышанными, и рынок не знает в лицо своих героев.
                Существуют премии и фестивали креативности, кинематографа и
                дизайна, но индустрия, создающая самую потребляемую сегодня
                форму контента, остаётся в тени.
              </p>
            </div>
            <div className={clsx(style.content__inner)}>
              <p className={clsx(style.content__text)}>
                Индустрия видеопроизводства в России стремительно развивается. С
                каждым годом появляется всё больше экспериментальных работ,
                новых форматов и технических решений. Но имена многих талантов
                остаются неуслышанными, и рынок не знает в лицо своих героев.
                Существуют премии и фестивали креативности, кинематографа и
                дизайна, но индустрия, создающая самую потребляемую сегодня
                форму контента, остаётся в тени.
              </p>
            </div>
          </div>
          <div className={clsx(style.footer)}>
            <div className={clsx(style.footer__inner)}></div>
            <div className={clsx(style.footer__inner)}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Festival;

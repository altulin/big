import clsx from "clsx";
import style from "./Festival.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";

const Festival: FC = () => {
  return (
    <section id={paths.festival} className={clsx(style.festival, "panel")}>
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
                Мы — креативное агентство Grape — в третий раз проводим
                фестиваль Big Picture, чтобы у видеоиндустрии появилась
                признанная премия, которая отмечает персональные заслуги и
                достижения продакшнов. Наша миссия — создавать новые стандарты
                на рынке видеопроизводства и делать его прозрачнее, награждая
                профессионалов отрасли и открывая новые имена в номинации Young
                Talent.
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

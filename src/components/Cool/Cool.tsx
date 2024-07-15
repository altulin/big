import clsx from "clsx";
import style from "./Cool.module.scss";
import { FC } from "react";
import { paths } from "@/service/paths";
import { info } from "./script";

const Cool: FC = () => {
  return (
    <section id={paths.cool} className={clsx(style.cool, "panel")}>
      <div className={clsx(style.cool__inner)}>
        <div className={clsx(style.content)}>
          <div className={clsx(style.content__head)}>
            <h2 className={clsx(style.cool__title)}>
              <span>Ты молод и свеж,</span>
              <span>но уже крут?</span>
            </h2>
            <p className={clsx(style.content__text)}>
              Покажи свою работу всей индустрии, чтобы твое имя запомнили!
            </p>
          </div>

          <div className={clsx(style.cube)}>
            <div className={clsx(style.cube__inner)}>
              <canvas className={clsx(style.canvas)} id="gl-cube"></canvas>
            </div>
          </div>
        </div>

        <div className={clsx(style.info)}>
          <div className={clsx(style.info__head)}>
            {info.map((item, i) => (
              <p key={i} className={clsx(style.info__text)}>
                {item}
              </p>
            ))}
          </div>

          <ul className={clsx(style.info__list)}>
            <li className={clsx(style.info__item)}>
              Выбирай подходящую номинацию
            </li>
            <li className={clsx(style.info__item)}>
              Загрузи видео с хештегом #bpfyoung24 на платформу NUUM
              <a
                className={clsx(style.info__link)}
                href="https://nuum.ru/"
                target="_blank"
              >
                https://nuum.ru/
              </a>{" "}
              и подай свою работу на нашем сайте
            </li>
            <li className={clsx(style.info__item)}>
              Становись своим в крутой индустрии
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cool;

import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC } from "react";
import { HashLink } from "react-router-hash-link";
import { paths } from "@/service/paths";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";

const Slide_2: FC<{ name: string; job: string; img: string }> = ({
  name,
  job,
  img,
}) => {
  const isTablet = useIsTabletDevice();

  return (
    <div className={clsx(style.slide_2)}>
      <div className={clsx(style.slide_2__info)}>
        <h2 className={clsx(style.slide_2__title)}>
          <span>Сторителлинг</span>
          <span>в операторском</span>
          <span>искусстве</span>
        </h2>
        <p className={clsx(style.slide_2__date)}>
          <span>9 июля</span>
          <span className={clsx(style.slide_2__time)}>14:00 / online</span>
        </p>

        {!isTablet && (
          <HashLink
            className={clsx(style.slide_2__link)}
            smooth
            to={paths.registration}
            onClick={() => {}}
          >
            Зарегистрироваться
          </HashLink>
        )}
      </div>

      <div className={clsx(style.instructor)}>
        <div className={clsx(style.instructor__inner)}>
          <figure className={clsx(style.instructor__figure)}>
            <img
              className={clsx(style.instructor__img)}
              src={img}
              alt="instructor"
            />
          </figure>
        </div>

        <div className={clsx(style.instructor_info)}>
          <h3 className={clsx(style.instructor_info__title)}>
            <span>{name}</span>
          </h3>
          <p className={clsx(style.instructor_info__text)}>{job}</p>
        </div>
      </div>
    </div>
  );
};
export default Slide_2;

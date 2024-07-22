/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Promo.module.scss";

const Instructor: FC<{ name: string; job: string; img: string }> = ({
  name,
  job,
  img,
}) => {
  const getImg = (img: any) => {
    return new URL(`./assets/${img}`, import.meta.url).href;
  };

  return (
    <div className={clsx(style.instructor)}>
      <div className={clsx(style.instructor__inner)}>
        <figure className={clsx(style.instructor__figure)}>
          <img
            className={clsx(style.instructor__img)}
            src={getImg(img)}
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
  );
};
export default Instructor;

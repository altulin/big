/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Program.module.scss";
import { IProgram } from "./script";

import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ProgramBtn from "./ProgramBtn";

const ContentItem: FC<{ item: IProgram; i: number }> = ({ item, i }) => {
  const { date, title, time, speakers, description } = item;
  const isTablet = useIsTabletDevice();

  return (
    <div className={clsx(style.item)}>
      {!isTablet && <ProgramBtn date={date} title={title} i={i} />}

      <div className={clsx(style.info)}>
        <div className={clsx(style.info__inner)}>
          <div className={clsx(style.info__head)}>
            <h3 className={clsx(style.info__title)}>
              <span>{title}</span>
              <span>{date}</span>
            </h3>
            <p className={clsx(style.info__time)}>{time}</p>
          </div>

          <div className={clsx(style.speakers)}>
            <p className={clsx(style.speakers__title)}>Спикеры:</p>
            <div className={clsx(style.speakers__content)}>
              <div className={clsx(style.speakers__pictures)}>
                {speakers.map(({ avatar }, i) => (
                  <figure key={i} className={clsx(style.speakers__figure)}>
                    <img src={avatar} alt="" />
                  </figure>
                ))}
              </div>

              <div className={clsx(style.speakers__names)}>
                {speakers.map(({ name }, i) => (
                  <span key={i}>{name}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={clsx(style.description)}>
            <p className={clsx(style.description__title)}>Описание:</p>
            <p className={clsx(style.description__text)}>{description}</p>
          </div>

          <a href="#" className={clsx(style.registration)}>
            Регистрация{" "}
          </a>
        </div>
      </div>
    </div>
  );
};
export default ContentItem;

/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Program.module.scss";
import { IProgram } from "./script";

import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ProgramBtn from "./ProgramBtn";
import { Link } from "react-router-dom";
import { paths } from "@/service/paths";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setProgramItem } from "@/store/program/programSlice";

const ContentItem: FC<{ item: IProgram; i: number }> = ({ item, i }) => {
  const {
    date,
    title,
    place,
    speakers,
    description,
    is_description,
    link_reg,
    link_online,
  } = item;
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();

  const { current } = useAppSelector((state) => state.program);

  const resetProgram = () => {
    dispatch(setProgramItem(null));
  };

  return (
    <div
      className={clsx(
        style.item,
        current === i.toString() && style["item_active"],
        "program-item",
      )}
    >
      {!isTablet && (
        <ProgramBtn
          is_description={is_description}
          date={date}
          title={title}
          i={i}
          isActive={current === i.toString()}
        />
      )}

      <div className={clsx(style.info)}>
        <div className={clsx(style.info__inner)}>
          <div className={clsx(style.info__head)}>
            <h3 className={clsx(style.info__title)}>
              <span className={clsx(style.info__date)}>{date}</span>
              <span className={clsx(style.info__sub_title)}>
                {title.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </span>
            </h3>

            <p className={clsx(style.place)}>
              <span className={clsx(style.visiting)}>
                <span>В гостях у:</span>
                <span>{place.visiting}</span>
              </span>

              <span className={clsx(style.place__content)}>
                <span className={clsx(style.place__info)}>Место и время:</span>
                <span className={clsx(style.place__time)}>{place.time},</span>

                <span className={clsx(style.place__address)}>
                  {place.address}
                </span>
              </span>
            </p>
          </div>

          <div className={clsx(style.description)}>
            <p className={clsx(style.description__text)}>{description}</p>
          </div>

          <div className={clsx(style.speakers)}>
            <p className={clsx(style.speakers__title)}>Спикеры:</p>
            <div className={clsx(style.speakers__content)}>
              <div className={clsx(style.speakers__pictures)}>
                {speakers.map(({ name, info_prof }, i) => (
                  <div key={i} className={clsx(style.speakers__item)}>
                    <span
                      className={clsx(style.speakers__name)}
                    >{`${name} - ${info_prof}`}</span>
                  </div>

                  // <div key={i} className={clsx(style.speakers__item)}>
                  //   <figure key={i} className={clsx(style.speakers__figure)}>
                  //     <img src={avatar} alt="" />
                  //   </figure>

                  //   <span className={clsx(style.speakers__name)}>{name}</span>
                  //   <button
                  //     onClick={handleSpeaker}
                  //     className={clsx(style.speakers__btn)}
                  //   >
                  //     Подробнее
                  //   </button>
                  // </div>
                ))}
              </div>
            </div>
          </div>

          <div className={clsx(style.footer)}>
            {link_reg && (
              <a
                onClick={resetProgram}
                href={link_reg.href}
                className={clsx(style.registration)}
                target="_blank"
              >
                {link_reg.label}
              </a>
            )}

            {link_online && (
              <a
                target="_blank"
                href={link_online.href}
                className={clsx(style.online)}
                onClick={resetProgram}
              >
                {link_online.label}
              </a>
            )}

            {/* {item.logo && !isTablet && (
              <div className={clsx(style.support)}>
                <span className={clsx(style.support__text)}>При поддержке</span>
                <a className={clsx(style.support__link)} href="#">
                  <item.logo />
                </a>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentItem;

/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Program.module.scss";
import { IProgram } from "./script";

import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ProgramBtn from "./ProgramBtn";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setProgramItem } from "@/store/program/programSlice";
import IconMegaInfo from "@/images/program/info_mega.svg?react";

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
    is_mega,
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
          is_mega={is_mega}
          date={date}
          title={title}
          i={i}
          isActive={current === i.toString()}
        />
      )}

      <div className={clsx(style.info)}>
        {is_mega && (
          <div className={clsx(style.info__mega_by)}>
            <IconMegaInfo />
          </div>
        )}

        <div
          className={clsx(
            style.info__inner,
            "swiper-no-mousewheel",
            "scroll-min",
          )}
        >
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
                href="https://nuum.ru/channel/bigpicturefestival/streams/live"
                className={clsx(style.online)}
                onClick={resetProgram}
              >
                Смотреть онлайн
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentItem;

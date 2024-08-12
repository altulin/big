/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { FC } from "react";
import style from "./Program.module.scss";

import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import ProgramBtn from "./ProgramBtn";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setProgramItem } from "@/store/program/programSlice";
import IconMegaInfo from "@/images/program/info_mega.svg?react";
import ScrollBarComponent from "@/hoc/scrollbar/ScrollBarComponent";
import { checkArr } from "@/service/checkArr";

const ContentItem: FC<{ item: any; i: number }> = ({ item, i }) => {
  const {
    date_at,
    speakers,
    description,
    is_active,
    sponsor_photo,
    collapsed_title,
    we_are_visiting_to,
    date_and_venue,
    buttons,
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
          is_description={is_active}
          is_mega={typeof sponsor_photo === "string"}
          date={date_at}
          title={collapsed_title.split("/")}
          i={i}
          isActive={current === i.toString()}
        />
      )}

      <div className={clsx(style.info)}>
        <ScrollBarComponent>
          {sponsor_photo && (
            <div className={clsx(style.info__mega_by)}>
              <IconMegaInfo />
            </div>
          )}

          <div className={clsx(style.info__inner, "swiper-no-mousewheel")}>
            <div className={clsx(style.info__head)}>
              <h3 className={clsx(style.info__title)}>
                <span className={clsx(style.info__date)}>{date_at}</span>
                <span className={clsx(style.info__sub_title)}>
                  {collapsed_title.split("/").map((item: any, i: number) => (
                    <span key={i}>{item}</span>
                  ))}
                </span>
              </h3>

              <p className={clsx(style.place)}>
                <span className={clsx(style.visiting)}>
                  <span>В гостях у:</span>
                  <span>{we_are_visiting_to}</span>
                </span>

                <span className={clsx(style.place__content)}>
                  <span className={clsx(style.place__info)}>
                    Место и время:
                  </span>

                  <span className={clsx(style.place__address)}>
                    {date_and_venue}
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
                  {speakers.map(({ name, position }: any, i: number) => (
                    <div key={i} className={clsx(style.speakers__item)}>
                      <span
                        className={clsx(style.speakers__name)}
                      >{`${name} - ${position}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={clsx(style.footer)}>
              {checkArr(buttons) &&
                buttons.map((item: any, i: number) => (
                  <a
                    key={i}
                    onClick={resetProgram}
                    href={item.link}
                    className={clsx(
                      item.background_color === "green" && style.registration,
                      item.background_color === "black" && style.online,
                    )}
                    target="_blank"
                  >
                    {item.title}
                  </a>
                ))}
            </div>
          </div>
        </ScrollBarComponent>
      </div>
    </div>
  );
};
export default ContentItem;

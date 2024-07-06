/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import style from "./Steps.module.scss";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import useControlDate from "./script";
import ControlBtn from "./Control";
import { Navigation } from "swiper/modules";
import { v4 as uuidv4 } from "uuid";
import { useIntermediateStageQuery } from "@/store/rtk/stage/intermediateStage";

const StepContentMob: FC = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const { data } = useIntermediateStageQuery(undefined);
  const { getLengthMob, head } = useControlDate(data);

  useEffect(() => {
    if (!swiper) return;
    if (swiper.destroyed) return;
    setTimeout(() => {
      // getLengthMob(new Date(2024, 8, 18, 12, 0, 1, 0), swiper);
      getLengthMob(new Date(), swiper);
    }, 500);
  }, [swiper]);

  return (
    <div className={clsx(style.steps_mob)}>
      <div className={clsx(style.steps_mob__inner)}>
        <ControlBtn dir="prev" />
        <Swiper
          modules={[Navigation]}
          onSwiper={setSwiper}
          className="steps_mob__swiper"
          navigation={{
            nextEl: `.${style[`button_slider--next`]}`,
            prevEl: `.${style[`button_slider--prev`]}`,
          }}
        >
          {head.map((item) => (
            <div key={uuidv4()}>
              {item.sub_item.map((sub) => (
                <SwiperSlide key={uuidv4()}>
                  <div className={clsx(style.steps_mob__item)}>
                    <div className={clsx(style.top)}>
                      <div
                        className={clsx(
                          style.top__bar,
                          style[`top__bar--${item.name}`],
                        )}
                      ></div>
                      <h3 className={clsx(style.top__title)}>{item.label}</h3>
                    </div>
                    <div className={clsx(style.bottom)}>
                      <div className={clsx(style.bottom__inner)}>
                        <span className={clsx(style.bottom__date)}>
                          {sub.date}
                        </span>
                        <span className={clsx(style.bottom__title)}>
                          {sub.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          ))}
        </Swiper>
        <ControlBtn dir="next" />
      </div>
    </div>
  );
};
export default StepContentMob;

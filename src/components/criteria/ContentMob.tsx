/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { criteria } from "./script";
import { Navigation, Thumbs } from "swiper/modules";
import clsx from "clsx";
import style from "./Criteria.module.scss";
import IconArr from "@/images/step/iconStepArr.svg?react";

const Button: FC<{ type: string }> = ({ type }) => {
  return (
    <button className={clsx(style.button, style[`button--${type}`])}>
      <IconArr />
    </button>
  );
};

const ContentMob: FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <div className={clsx(style.rules__head)}>
        <Swiper
          onSwiper={setThumbsSwiper}
          className={clsx(style.slider)}
          allowTouchMove={false}
        >
          {criteria.map((item, i) => (
            <SwiperSlide key={i} className={clsx(style.head_slide)}>
              <h3 className={clsx(style.rules__title)}>{item.title}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button type="prev" />
        <Button type="next" />
      </div>

      {thumbsSwiper !== null && thumbsSwiper.destroyed !== true && (
        <div className={clsx(style.rules__content)}>
          <Swiper
            modules={[Navigation, Thumbs]}
            className={clsx(style.slider)}
            thumbs={{ swiper: thumbsSwiper }}
            navigation={{
              nextEl: `.${style[`button--next`]}`,
              prevEl: `.${style[`button--prev`]}`,
            }}
          >
            {criteria.map((item, i) => (
              <SwiperSlide key={i}>
                <ul className={clsx(style.rules__list)}>
                  {item.rules.map((rule, i) => (
                    <li key={i} className={clsx(style.rules__item)}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
export default ContentMob;

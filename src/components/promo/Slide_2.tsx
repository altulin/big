/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC, useEffect, useState } from "react";
import Instructor from "./Instructor";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useAppSelector } from "@/hooks/hook";
import { useSlideQuery } from "@/store/rtk/main/slide";

const Slide_2: FC = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const { slide } = useAppSelector((state) => state.promo);
  const { data } = useSlideQuery(undefined);

  useEffect(() => {
    if (!swiper) return;
    if (slide !== 1) return;
    swiper.slideNext(1000);
  }, [slide, swiper]);

  if (!data) return null;

  const { button_title, button_link, title, date_at, meet_format, speakers } =
    data;

  return (
    <div className={clsx(style.slide_2)}>
      <div className={clsx(style.slide_2__info)}>
        <h2 className={clsx(style.slide_2__title)}>{title}</h2>
        <p className={clsx(style.slide_2__date)}>
          <span>{date_at}</span>
          <span>/</span>
          <span className={clsx(style.slide_2__time)}>{meet_format}</span>
        </p>

        <a
          className={clsx(style.slide_2__link)}
          href={button_link}
          target="_blank"
        >
          {button_title}
        </a>
      </div>

      <Swiper
        onSwiper={setSwiper}
        className={clsx(style.instructor__slider)}
        modules={[EffectFade, Autoplay]}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 800,
          disableOnInteraction: false,
        }}
      >
        {speakers.map((item: any, i: number) => (
          <SwiperSlide key={i}>
            <Instructor {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slide_2;

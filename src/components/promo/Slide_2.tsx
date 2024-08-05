/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC, useEffect, useState } from "react";
import Instructor from "./Instructor";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { peoples } from "./script";
import { useAppSelector } from "@/hooks/hook";

const Slide_2: FC = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const { slide } = useAppSelector((state) => state.promo);

  useEffect(() => {
    if (!swiper) return;
    if (slide !== 1) return;

    // console.log(132132);

    // swiper.slideToLoop(swiper.realIndex, 1000);

    swiper.slideNext(1000);
  }, [slide, swiper]);

  return (
    <div className={clsx(style.slide_2)}>
      <div className={clsx(style.slide_2__info)}>
        <h2 className={clsx(style.slide_2__title)}>
          <span>LED-экраны:</span>
          <span>съёмка без</span>
          <span>ограничений?</span>
        </h2>
        <p className={clsx(style.slide_2__date)}>
          <span>8 августа</span>
          <span className={clsx(style.slide_2__time)}>
            18:30 / ONLINE + OFFLINE
          </span>
        </p>

        {/* <a
          className={clsx(style.slide_2__link)}
          href="https://bpf2024.timepad.ru/event/2967461/"
          target="_blank"
        >
          Зарегистрироваться
        </a> */}
        <a
          className={clsx(style.slide_2__link)}
          href="https://nuum.ru/channel/bigpicturefestival/streams/live"
          onClick={() => {}}
          target="_blank"
        >
          Смотреть онлайн
        </a>
      </div>

      <Swiper
        onSwiper={setSwiper}
        className={clsx(style.instructor__slider)}
        modules={[EffectFade, Autoplay]}
        speed={1000}
        loop={true}
        // cssMode={true}
        autoplay={{
          delay: 800,
          disableOnInteraction: false,
        }}
      >
        {peoples.map((item: any, i: number) => (
          <SwiperSlide key={i}>
            <Instructor {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slide_2;

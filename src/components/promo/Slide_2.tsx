/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC } from "react";
import Instructor from "./Instructor";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { girls } from "./script";

const Slide_2: FC = () => {
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

        <a
          className={clsx(style.slide_2__link)}
          href="https://bpf2024.timepad.ru/event/2961533/ "
          onClick={() => {}}
          target="_blank"
        >
          Зарегистрироваться
        </a>
      </div>

      <Swiper
        className={clsx(style.instructor__slider)}
        modules={[EffectFade, Autoplay]}
        effect={"fade"}
        speed={1000}
        loop={true}
        fadeEffect={{
          crossFade: true,
        }}
        // autoplay={{
        //   delay: 1000,
        //   disableOnInteraction: false,
        // }}
      >
        {girls.map((item: any, i: number) => (
          <SwiperSlide key={i}>
            <Instructor {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slide_2;

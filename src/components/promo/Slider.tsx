import clsx from "clsx";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import style from "./Promo.module.scss";

import Slide_1 from "./Slide_1";
import Slide_2 from "./Slide_2";
import { Navigation } from "swiper/modules";
import imgInstructor from "@/images/promo/instructor.png";

const Slider: FC = () => {
  const slides = [
    <Slide_1 />,
    <Slide_2
      name="Adam Bentel"
      job="оператор-постановщик из ЮАР"
      img={imgInstructor}
    />,
    <Slide_2 name="Андрей Долгов" job="режиссер" img={imgInstructor} />,
  ];

  return (
    <Swiper
      className={clsx(style.slider)}
      modules={[Navigation]}
      navigation={{
        nextEl: `.${style[`button_slider--next`]}`,
        prevEl: `.${style[`button_slider--prev`]}`,
      }}
      speed={1000}
      allowTouchMove={false}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={clsx(style.slide)}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Slider;

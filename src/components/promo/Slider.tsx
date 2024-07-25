import clsx from "clsx";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./Promo.module.scss";
import Slide_1 from "./Slide_1";
import Slide_2 from "./Slide_2";
import { Navigation, Autoplay } from "swiper/modules";

import Slide_3 from "./Slide_3";
import { useAppDispatch } from "@/hooks/hook";
import { setPromoSlide } from "@/store/promoSlider/promoSlice";

const Slider: FC = () => {
  const dispatch = useAppDispatch();
  const slides = [<Slide_1 />, <Slide_2 />, <Slide_3 />];

  return (
    <Swiper
      autoHeight={false}
      className={clsx(style.slider)}
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl: `.${style[`button_slider--next`]}`,
        prevEl: `.${style[`button_slider--prev`]}`,
      }}
      speed={1000}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      // allowTouchMove={false}

      spaceBetween={8}
      breakpoints={{
        320: { allowTouchMove: true, autoHeight: false },
        768: { allowTouchMove: false, autoHeight: false },
      }}
      onSlideChange={(s) => dispatch(setPromoSlide(s.realIndex))}
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

import clsx from "clsx";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import style from "./Promo.module.scss";

import Slide_1 from "./Slide_1";
import Slide_2 from "./Slide_2";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch } from "@/hooks/hook";
import { setClick, setPath } from "@/store/menu/menuSlice";
import { paths } from "@/service/paths";
import Slide_3 from "./Slide_3";

const Slider: FC = () => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const slides = [<Slide_1 />, <Slide_2 />, <Slide_3 />];

  const changeHandle = () => {
    if (isTablet) return;
    dispatch(setClick(true));
    dispatch(setPath(paths.promo));
  };

  return (
    <Swiper
      autoHeight={false}
      className={clsx(style.slider)}
      modules={[Navigation, EffectFade, Autoplay]}
      navigation={{
        nextEl: `.${style[`button_slider--next`]}`,
        prevEl: `.${style[`button_slider--prev`]}`,
      }}
      speed={1000}
      effect={"fade"}
      loop={true}
      fadeEffect={{
        crossFade: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      allowTouchMove={false}
      onSlideChangeTransitionStart={changeHandle}
      // autoHeight={true}
      spaceBetween={8}
      breakpoints={{
        320: { allowTouchMove: true, autoHeight: false },
        768: { allowTouchMove: false, autoHeight: false },
      }}
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

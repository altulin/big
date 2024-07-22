import clsx from "clsx";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import style from "./Promo.module.scss";

import Slide_1 from "./Slide_1";
import Slide_2 from "./Slide_2";
import { Navigation } from "swiper/modules";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import { useAppDispatch } from "@/hooks/hook";
import { setClick, setPath } from "@/store/menu/menuSlice";
import { paths } from "@/service/paths";

const Slider: FC = () => {
  const isTablet = useIsTabletDevice();
  const dispatch = useAppDispatch();
  const slides = [<Slide_1 />, <Slide_2 />];

  const changeHandle = () => {
    if (isTablet) return;
    dispatch(setClick(true));
    dispatch(setPath(paths.promo));
  };

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
      onSlideChangeTransitionStart={changeHandle}
      // autoHeight={true}
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

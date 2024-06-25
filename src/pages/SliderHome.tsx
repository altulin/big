/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import clsx from "clsx";
import style from "./HomePage.module.scss";
import { pages } from "./HomePage";

const SliderHome: FC = () => {
  return (
    <>
      <Swiper
        className={clsx(style.home__slider)}
        modules={[Scrollbar, Mousewheel, FreeMode]}
        // allowTouchMove={false}
        mousewheel={{ enabled: true }}
        // freeMode={{ enabled: true }}
        scrollbar={{
          draggable: true,
          el: `.${style.scrollbar}`,
          dragClass: `${style.scrollbar__drag}`,
        }}
      >
        {pages.map((slide: any, index: number) => (
          <SwiperSlide key={index} className={clsx(style.slide)}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={clsx(style.scrollbar)}></div>
    </>
  );
};
export default SliderHome;

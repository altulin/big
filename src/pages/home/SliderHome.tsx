/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import clsx from "clsx";
import style from "./HomePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { checkArr } from "@/service/checkArr";
import { setClick, setPath } from "@/store/menu/menuSlice";
import { setSwiperProgress, setSwiperSlides } from "@/store/swiper/swiperSlice";
import "swiper/css";

const SliderHome: FC<{ pages: any }> = ({ pages }) => {
  const { path, isClick } = useAppSelector((state) => state.menu);
  const [swiper, setSwiper] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!swiper) return;
    const listSlides = swiper.slides;
    if (!checkArr(listSlides)) return;

    const slides = listSlides.map((slide: any) => {
      const id = slide.querySelector(".panel").id;
      return id;
    });

    dispatch(setSwiperSlides(slides));
  }, [dispatch, swiper]);

  useEffect(() => {
    // при переходе с других страниц
    if (!swiper) return;

    const listSlides = swiper.slides;

    if (!checkArr(listSlides)) return;

    const slide = listSlides.filter(
      (slide: any) => slide.querySelector(".panel").id === path,
    )[0];

    const index = listSlides.indexOf(slide);

    swiper.slideTo(index, 1000);
  }, [path, swiper]);

  useEffect(() => {
    if (!swiper) return;
    if (!isClick) return;

    const listSlides = swiper.slides;

    if (!checkArr(listSlides)) return;

    const slide = listSlides.filter(
      (slide: any) => slide.querySelector(".panel").id === path,
    )[0];

    const index = listSlides.indexOf(slide);

    swiper.slideTo(index, 1000);
    dispatch(setClick(false));
  }, [dispatch, isClick, path, swiper]);

  return (
    <>
      <Swiper
        // touchStartPreventDefault={false}
        // preventClicks={false}
        // preventClicksPropagation={false}
        simulateTouch={false}
        onSwiper={setSwiper}
        className={clsx(style.home__slider)}
        modules={[Scrollbar, Mousewheel, FreeMode]}
        mousewheel={{ releaseOnEdges: true, sensitivity: 14 }}
        freeMode={{ enabled: true }}
        scrollbar={{
          draggable: true,
          el: `.${style.scrollbar}`,
          dragClass: `${style.scrollbar__drag}`,
        }}
        wrapperClass={"swiper-wrapper home-swiper-wrapper"}
        // allowTouchMove={false}
        // initialSlide={12}
        slidesPerView="auto"
        preventInteractionOnTransition={true}
        onSlideChange={(s) => {
          dispatch(setSwiperProgress(s.progress));
          if (isClick) return;

          const listSlides = s.slides;
          const panelElement =
            listSlides[s.activeIndex].querySelector(".panel");
          const path = panelElement ? panelElement.id : null;
          dispatch(setPath(path));
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

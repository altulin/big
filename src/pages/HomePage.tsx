/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import Promo from "@/components/promo/Promo";
import Steps from "@/components/steps/Steps";
import Nominations from "@/components/nominations/Nominations";
import SubmissionOfWorks from "@/components/submission_of_works/SubmissionOfWorks";
import Price from "@/components/Price/Price";
import Requirements from "@/components/requirements/Requirements";
import Criteria from "@/components/criteria/Criteria";
import Jury from "@/components/jury/Jury";
import clsx from "clsx";
import style from "./HomePage.module.scss";
import Program from "@/components/program/Program";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel, FreeMode } from "swiper/modules";

const HomePage: FC = () => {
  const pages: any = [
    <Promo />,
    <Steps />,
    <Nominations />,
    <SubmissionOfWorks />,
    <Price />,
    <Requirements />,
    <Criteria />,
    <Jury />,
    <Program />,
  ];

  console.log(`.${style.scrollbar}`);

  return (
    <div className={clsx(style.home)}>
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
    </div>
  );
};
export default HomePage;

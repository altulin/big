import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC } from "react";
import IconMain from "@/images/header/logo.svg?react";

const Slide_1: FC = () => {
  return (
    <div className={clsx(style.slide_1)}>
      <figure className={clsx(style.slide_1__figure)}>
        <IconMain />
      </figure>
      <p className={clsx(style.slide_1__text)}>
        {/* <span></span>
        <span></span>
        <span></span> */}
        фестиваль видеоиндустрии, презентующий лучшие работы и&nbsp;персональные
        достижения в коммерческой и социальной рекламе, музыкальных видео и
        анимации
      </p>
    </div>
  );
};
export default Slide_1;
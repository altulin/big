import clsx from "clsx";
import style from "./Promo.module.scss";
import { FC, useEffect } from "react";
import { canvasCursor } from "@/service/canvas";
import { useIsTabletDevice } from "@/hooks/IsSmallDevice";
import IconMain from "@/images/header/logo.svg?react";

const Slide_1: FC = () => {
  const isTablet = useIsTabletDevice();

  useEffect(() => {
    if (isTablet) return;
    canvasCursor("canvas-sm");
  }, [isTablet]);

  return (
    <div className={clsx(style.slide_1)}>
      <figure className={clsx(style.slide_1__figure, "js-logo-placemove")}>
        {isTablet ? <IconMain /> : <canvas id="canvas-sm"></canvas>}
      </figure>
      <p className={clsx(style.slide_1__text)}>
        фестиваль видеоиндустрии, презентующий лучшие работы и&nbsp;персональные
        достижения в коммерческой и социальной рекламе, музыкальных видео и
        анимации
      </p>
    </div>
  );
};
export default Slide_1;
